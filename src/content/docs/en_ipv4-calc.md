---
title: 	IPv4: first and last addresses, masks and network size
tags:	networking, math, bitwise ops
desc:	How to work out the network address, broadcast address and number of hosts from an IPv4 address and a mask, by hand.
date:	2020-06-14
bg: 	default
---

You have the address `192.168.2.4/22`, where `/22` is the network mask.

From this alone you need the first and last address of the network, how many IP addresses fit into it and, as a bonus, the mask written in the same style as an address.

## **1. Binary form of the address**

To work these out easily you need the binary forms of the address and the mask.

Each part of an address separated by a dot, called an **octet**, is one binary number (a string) where each 0 or 1 stands for one of these powers of two, in order: **128, 64, 32, 16, 8, 4, 2, 1**. The octet `192` is therefore `1100 0000`, and the whole address `192.168.2.4` is:

```
1100 0000 | 1010 1000 | 0000 0010 | 0000 0100
```

**How to do it quickly in your head?**

Look for the biggest number from the list of powers that fits into the decimal number. For `192` that is **128**, which is right in the first position. Write a one, 192-128=64, **64** is the second position, nothing is left, so the rest are zeros and you have `1100 0000`.

To make sure it clicks, take `168`: **128** fits, so you write a one, 168-128=40, the next power that fits into `40` is **32**, 40-32=8, so you write ones at the positions **128, 32, 8**, the rest are zeros and you get `1010 1000`.

Every octet is calculated separately. Now you should have the address in binary.

---

## **2. Binary and decimal form of the mask**

If the mask is written as `/22`, it simply means 22 ones in a row followed by zeros. Here you write all the octets at once:

```
1111 1111 | 1111 1111 | 1111 1100 | 0000 0000
```

**Decimal form:**
If you feel like converting it from binary to decimal, this mask is `255.255.252.0`. For this conversion you again handle each octet separately, with the same powers as in the example for the address: **128, 64, 32, 16, 8, 4, 2, 1**.

Notice that for 1111 1100, since you know the highest reachable number (1111 1111) is 255, it is enough to subtract 2 and 1 and you have 252. There is no need to work it out from scratch.

---

## **3. First address of the network**

Now that you have the binary address and the binary mask (the first two examples), you need to do a so-called binary product of the two, and the first address of the network comes out of it.

The binary product works by multiplying the digits that sit on top of each other, so you get either 0 or 1.

```
1100 0000 | 1010 1000 | 0000 0010 | 0000 0100 (address)
1111 1111 | 1111 1111 | 1111 1100 | 0000 0000 (mask)
_____________________________________________
1100 0000 | 1010 1000 | 0000 0000 | 0000 0000 (binary product = first address of the network)
```

Now you have the first address of the network. Convert it to decimal (see the decimal mask example if unsure) and you get `192.168.0.0`.

This address never belongs to a specific device. It serves as the "network number", and the first usable address for a device (`192.168.0.1`) comes right after it.

---

## **4. Last address of the network**

Turn the zeros of the mask into ones and the ones that were there into zeros, which gives you a sort of "inverse mask", then add the digits on top of each other (bitwise OR), ignoring the rest.

```
1100 0000 | 1010 1000 | 0000 0010 | 0000 0100 (address)
0000 0000 | 0000 0000 | 0000 0011 | 1111 1111 (inverse mask)
_____________________________________________
1100 0000 | 1010 1000 | 0000 0011 | 1111 1111 (sum = last address of the network)
```

Then convert it to decimal (see the decimal mask example if unsure) and you have `192.168.3.255`.

This address never belongs to a specific device either; it is used for [broadcast](https://en.wikipedia.org/wiki/Broadcast_address), which means sending messages to all devices on the network.

---

## **5. Maximum number of addresses in the network**

For this the "inverse mask" from the previous step is enough.

```
0000 0000 | 0000 0000 | 0000 0011 | 1111 1111 (inverse mask)
```

Convert it to decimal and you get `0.0.3.255`.

Now keep in mind that in IP addresses the octet `0` is valid too, so counting starts from zero, and for a correct result you have to add one to every octet of the decimal inverse mask. For example `0-255` is 256 numbers. After adding, it is no longer an inverse mask but the maximum count of values for each octet: `1.1.4.256`.

Finally, multiply them all:

```
1*1*4*256 = 1024
```

And **1024** is the correct answer for the maximum number of addresses in the network.

The first address (here `192.168.0.0`) is the network number and the last one (here `192.168.3.255`) is for [broadcast](https://en.wikipedia.org/wiki/Broadcast_address), so the maximum number of devices is **1022**.

---

## **Now you know...**

The network that the IPv4 address `192.168.2.4/22` belongs to:

- has the mask `255.255.252.0`
- has the first address `192.168.0.0` (the network number)
- has the last address `192.168.3.255` (the broadcast)
- can hold at most 1024 addresses (of which 1022 are devices)
