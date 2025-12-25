#!/bin/bash

# Bash script to generate markdown docs for each project

# Define projects as a here-document (YAML-like)
read -r -d '' PROJECTS <<'EOF'
  - title: 3D Animation - ECHO 2022
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--vp-c-brand-2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7" r="4"/><path d="M5.5 21h13a2 2 0 0 0 2-2v-1a7 7 0 0 0-7-7h-1a7 7 0 0 0-7 7v1a2 2 0 0 0 2 2z"/></svg>
    link: https://www.youtube.com/watch?v=tlIpi9zFVsc
    linkText: Watch on YouTube

  - title: 3D Animation - Treason 2019
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--vp-c-brand-2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7" r="4"/><path d="M5.5 21h13a2 2 0 0 0 2-2v-1a7 7 0 0 0-7-7h-1a7 7 0 0 0-7 7v1a2 2 0 0 0 2 2z"/></svg>
    link: /gfx/en/treason/
    linkText: Presentation

  - title: 2D Character Animation Reel
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--vp-c-brand-2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7" r="4"/><path d="M5.5 21h13a2 2 0 0 0 2-2v-1a7 7 0 0 0-7-7h-1a7 7 0 0 0-7 7v1a2 2 0 0 0 2 2z"/></svg>
    link: https://youtu.be/w8deVJAyRk8
    linkText: Watch on YouTube
EOF

# Helper: slugify title for filename
slugify() {
    echo "$1" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g;s/^-+|-+$//g'
}

# Parse and generate markdown files
current_title=""
current_details=""
current_meta=""
current_link=""
current_linkText=""

while IFS= read -r line || [[ -n "$line" ]]; do
    # Remove leading/trailing whitespace
    line=$(echo "$line" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
    # New project
    if [[ "$line" == "- title:"* ]]; then
        # Write previous project if exists
        if [[ -n "$current_title" ]]; then
            filename="$(slugify "$current_title").md"
            {
                echo "---"
                echo "title: \"$current_title\""
                echo "---"
                echo
                echo "$current_details"
                if [[ -n "$current_meta" ]]; then
                    echo
                    echo "**Meta:** $current_meta"
                fi
                if [[ -n "$current_link" && -n "$current_linkText" ]]; then
                    echo
                    echo "[$current_linkText]($current_link)"
                elif [[ -n "$current_link" ]]; then
                    echo
                    echo "[$current_link]($current_link)"
                fi
            } > "$filename"
        fi
        # Reset fields
        current_title="${line#- title: }"
        current_details=""
        current_meta=""
        current_link=""
        current_linkText=""
    elif [[ "$line" == "details:"* ]]; then
        current_details="${line#details: }"
    elif [[ "$line" == "meta:"* ]]; then
        current_meta="${line#meta: }"
    elif [[ "$line" == "link:"* ]]; then
        current_link="${line#link: }"
    elif [[ "$line" == "linkText:"* ]]; then
        current_linkText="${line#linkText: }"
    fi
done <<< "$PROJECTS"

# Write last project
if [[ -n "$current_title" ]]; then
    filename="$(slugify "$current_title").md"
    {
        echo "---"
        echo "title: \"$current_title\""
        echo "---"
        echo
        echo "$current_details"
        if [[ -n "$current_meta" ]]; then
            echo
            echo "**Meta:** $current_meta"
        fi
        if [[ -n "$current_link" && -n "$current_linkText" ]]; then
            echo
            echo "[$current_linkText]($current_link)"
        elif [[ -n "$current_link" ]]; then
            echo
            echo "[$current_link]($current_link)"
        fi
    } > "$filename"
fi

echo "Markdown docs generated."