---
title:	Port-forwarding a Raspberry PI Access Point using IPTables
tags:	iptables, networking, linux, sysadmin
desc:	A walkthrough tutorial for not just port-forwarding, but problem solving when it comes to IPTables.
date:	2020-09-05
bg:		default
---

> This guide applies to any Linux distro on any platform (doesn't have to be on Raspberry Pi) that runs the `iptables` firewall and has access to both an internal and external network of sorts, more on both down below.

# Introduction 

## How my Raspberry PI AP is currently setup

Imagine you have a Raspberry PI connected to an external network through Ethernet with a Wi-Fi hotspot that is also an internal network. By default this can be achieved through Network Manager, even with GUI.

For the purpose of this guide (and by default on my network) external IP addresses are `192.168.1.1+` and internal addresses are `10.42.0.1+`. 

If the external network is connected to the internet, the connection is also forwarded to internal clients, external network however doesn't have to know about the presence of such clients as it can be easily masked by the AP Wi-Fi interface's MAC and IP.

# The Problem 

## How my port-routing currently works

You're running a webserver on one of the internal clients (`10.42.0.85:80` for example) and want to make it externally available. 

This would mean that a client on say `192.168.1.2` should be able to connect through your AP's external IP to the server on `10.42.0.85:80`.

By default any request to your AP's address would obviously end in an error, because your AP isn't the webserver, the webserver is its client.

![The missing link between AP and webserver](img/networks.svg)

# The Solution 

## Implementing port-forwarding

For this reason on any conventional router there is a port-forwarding table that matches requests to the router with its individual clients and can be bound with either a MAC or an IP address, or both. 

The act of port-forwarding also allows to move the entire port range to different numbers (which means that your request port doesn't actually have to be the port that the webserver is ran on, if it happens to already be occupied or you just want it on a different port).

On Linux devices such as Raspberry PI this process can be achieved using the "for many dreaded"`iptables` firewall.

### Adding relevant iptables rules

First of all you need to catch the request somewhere in the `iptables` network of chains and tables. 

A great place to start is to look for the *iptables Processing Flowchart*, which will give you an idea around how your request packet travels.

![iptables Processing Flowchart](img/flowchart.png)

After you are able to imagine the possible routes you need to check individual tables for whether they allow your request packet to pass through them to the right destination. 

The most used table is the default `FILTER` table (which doesn't have to be specified in the commands and is often omitted), we are here for a different one first, the `NAT` table. 

```bash
# List entries in the NAT table
iptables -t nat -L
```

If you looked at the flowchart you would know that this is right after the first decision has been made (to check whether localhost is the source of the packet, which it is definitely not, because we're sending the request from the external network).

The `nat PREROUTING` table and chain seem to be the right place to put our first redirection rule, because they match all of our criteria (packets (requests) from external network need to be redirected to an internal client and not the Pi itself).

![Surroundings of the table/chain in question](img/flowchart-1.png)

The reason for why that is is because the next decision to be made is whether the packet is directed "for this host". This is definitely not true, yet by default it will be true, because Pi has no idea that you want requests to the given port redirected to another client (internal or external).

**Now that we know where to strike, we need to figure out how to strike:**

```bash
# Redirect traffic going to the port 80 to the internal webserver on 10.42.0.85:80
iptables -t nat -I PREROUTING 1 -p tcp --dport 80 -j DNAT --to-destination 10.42.0.85:80
```

At first this may seem like a lot of weird unnecessary flags, "*Why is there a 1, what does -I do, what is DNAT*" you may ask, and here are the answers:

- `-t nat` We're manipulation the NAT table
- `-I PREROUTING 1` We're `I`nserting a rule into the `PREROUTING` chain at position `1` 
  - (It's also possible to append at the end of the chain with `-A` without the need for position, that however doesn't guarantee that your request won't get blocked by a previous rule)
- `-p tcp` HTTP (the protocol for webservers) works over the TCP protocol
- `--dport 80` is the destination port. This is the port specified in the request from the external network, in other words the port you're **forwarding from**.
- `-j DNAT` is the rule that allows you to redirect the request to a different destination
  - `--to-destination 10.42.0.85:80` is the destination along with the optional port you're **forwarding to**, in this case we're keeping the same port (80).

And with that you made the most important rule of this guide. In case you made an error you can:

- Inspect the current state of the table with `iptables -t nat -L`, noticing the position of the rule with the mistake in the chain
- Remove the rule with `iptables -t nat -D CHAIN N` where CHAIN is the name of the chain and N is the position (starting from 1 from the top of the chain).

### It still doesn't work because...

Chances are that your rule will still not be quite sufficient enough to convince  `iptables` to forward your request. There can be three main reasons for this:

- `iptables` is not currently running
- The chains on the way to your rule and after it (in the flowchart), or the chain your rule is in has its default policy (for when there aren't matching rules to be applied) not set to ACCEPT.
- There is a rule in one of the chains afterwards or before (in the flowchart) that makes `iptables` either REJECT or DROP your request, possibly even redirect it to the wrong destination.

The first reason can be easily checked by listing active kernel mods and searching them for iptables: `lsmod | grep "ip_tables"` (For some reason there should be an underscore in the name, to truly make sure also try checking `grep "ip"` for any relevant mentions).

The second and third reasons are a part of the same problem that will require deeper debugging and rule-creation or changing in different parts of the `iptables` flowchart.

### Debugging IPTables

> This can be achieved by either:
>
> - Hoping that StackOverflow has the answer, then getting angry when it doesn't work and you don't know why or where to look for clues (while great for exploring options, don't blindly do this if you expect to get out of the rabbit hole of problems)
> - Creating & reading the logs, figuring out the current path that your request takes
> - Blindly checking tables & chains for rules that could be causing trouble

**Playing the detective**

Check the iptables flowchart and try to figure out where the request could get stuck by listing the entries of the given tables.

The most likely places where this could occur is the FILTER table (because it's the most used one) or the NAT table (because you may have misconfigured something).

If you're running an extra-secure distro of Linux, there is also the possibility of the SECURITY table, and lastly the MANGLE table. I would not expect the problem to be in these two in your average setup.

In case you're not finding any problematic rules, also check the policies.

Chances are that one of the chains might not have any rules and its default policy is not to ACCEPT, in such case you can either add a rule like we did previously or change the policy: 

```bash
iptables -t tablename -P CHAIN POLICY
```

- Where table name is "nat", "filter" (can be omitted), "security" or "mangle"; chain is the name of the chain and policy should be ACCEPT, but you can also use DROP.
- Be careful with this, especially so that you won't accidentally create a gaping hole in your firewall by allowing more than is necessary. You're many times better off creating specific rules in secure environments.

You can create rules like these:

```bash
# Append (at the end) of filter table's INPUT chain an ACCEPT rule for anything with destination port 80 coming from the optional "eth1" interface 
# (if there are any preceding rules that throw away your packet this rule won't be reached, it's also unlikely that the INPUT chain will be reached because of the way our packet should travel on the flowchart)

iptables -A INPUT -i eth1 -p tcp --dport 80 -j ACCEPT


# Accept anything on the TCP protocol with destination port of 80 in the filter's FORWARD chain, insert this as the first rule before any others have a chance to process the packet

iptables -I FORWARD 1 -p tcp --dport 80 -j ACCEPT
```

#### Still not working? Logs!

**Starting the logging process**

If you've done everything you could or simply don't want to waste any more time looking for some weird rule that you can't find, you can try narrowing down the problem by adding a LOG rule in any chain at any position:

```bash
iptables -t nat -I PREROUTING 1 -m limit --limit 5/m -j LOG --log-prefix="iptables NAT PRE: " --log-level 7
```

- In this case a log would be immediately started on the nat/PREROUTING chain before any rules take place (at the first position) with a limit (to not overspam the logs) and a prefix. The logging level of 7 exposes the highest amount of information (also known as the debugging level)

**Reading the logs**

To read the logs I recommend to try one of these commands:

```
journalctl -f
```

```
tail -f /var/log/syslog
```

If neither work you can try looking around the `/var/log` directory for any recently (last 10 minutes) changed files using `find /var/log -mmin 10`, then preview the files using `tail -f PATH_TO_FILE`.

**How to read the logs**

Your main way of orientation are the prefixes you specified in the last iptables command, those will help you understand what logging rule the packed passed through. 

Secondary to that there is the actual information within the packet that can be blocked, redirected or passed on by `iptables` such as the source and destination addresses and ports. These will also help you understand that what you're looking at is the log for the packet you're trying to get across.

Lastly, the way you figure out whether a packet manages to get to the end is that you slowly encroach on the rules by logging in different chains and seeing which ones the packet managed to pass through unharmed. 

I recommend that you open two terminals for this, one with the live log, and a second one where you spam different iptables rule addition/removal and log addition/removal commands hoping that something will stick.

> For me, the greater part of the 6 hours that my packets refused to get through was spent figuring out how to get to this stage. My problem was that one of the FILTER table rules on FORWARD chain were rejecting my packet, even though it wasn't obvious from the listing. I fixed the problem by inserting a rule to the first position to ACCEPT anything destined for my webserver. (`iptables -I FORWARD 1 -p tcp --dport 80 -j ACCEPT`)

# The Afterthoughts

If you made it this far, congratulations, your packet most likely managed / will manage to get through the network of rules, chains and tables too.

The world of Linux is an expansive one, where different tools have different, and more than often convoluted ways of getting stuff done, so much so, that many people including myself get lost in the scale of it all. The main reason for why this is the reality, in my opinion, is that there isn't a straightforward design codex or standardization in place.

Nevertheless, now both you and I are one step closer towards getting a proper grasp over this gigantic virtual world.

Thank you. 