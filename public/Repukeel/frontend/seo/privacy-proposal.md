# Privacy Policy Update Proposal: Free Browser-Based Brand Protection Utilities

**Date:** 2026-10-27  
**Status:** Awaiting Approval (Approval Gate)  
**Target Document:** `src/app/privacy-policy/page.tsx` (and public terms)  

---

## 1. Background & Rationale

RepuKeel provides client-side free brand protection utilities, including the **Search Query Builder** (`/tools/search-query-builder`) and the **Reverse Image Search Launcher** (`/tools/reverse-image-search`). 

The Reverse Image Search Launcher supports two execution modes:
1. **Image link mode:** Users input a publicly accessible image URL to query third-party search engines.
2. **Upload from device mode:** Users select an image file (`image/jpeg`, `image/png`, `image/webp`, `image/gif`, up to 10 MB) from their local computer or phone.

To maintain strict user privacy and zero-knowledge architecture:
- Neither user search strings, image URLs, nor uploaded image files are sent to, proxied by, logged by, or stored on RepuKeel servers.
- When submitting a local image file, the browser directly submits an HTML multipart form (`POST`) straight to the selected search engine (Google Lens or Yandex Images) via a new browser tab.
- No filenames, image metadata, or EXIF data are captured in application logs, database records, or analytics platforms.

---

## 2. Proposed Privacy Policy Clauses

We propose adding a dedicated subsection under **Section 1 ("Information We Collect")** or **Section 2 ("How We Use Your Information")** titled **"Free Browser-Based Tools"**:

### Proposed Clause: "Free Client-Side Tools & Reverse Image Search"
> **Client-Side Free Tools & Privacy by Design:**  
> When you use our free utilities, including the Search Query Builder and Reverse Image Search Launcher:  
> 1. **No Data Collection or Server Processing:** Query parameters, search operators, image URLs, and image files selected for search are processed entirely within your local browser runtime. RepuKeel does not transmit, intercept, inspect, or store your search terms, image URLs, or image files on our servers.  
> 2. **Direct Browser-to-Engine Transmission:** When using the "Upload from device" feature in the Reverse Image Search Launcher, your file is transferred directly from your client browser to the third-party search engine you elect to query (e.g., Google Lens or Yandex Images) in a separate browser tab. No file or intermediate copy touches RepuKeel infrastructure.  
> 3. **No File Logging or Analytics Tracking:** Filenames, file sizes, image metadata, and query content are strictly excluded from our website analytics, telemetry, and error logging services.  
> 4. **Third-Party Terms & Policies:** Once your browser submits a search query or image file to an external search provider, the processing and retention of that request are governed exclusively by the terms and privacy policy of that respective search engine provider.  
> 5. **Permitted Use Notice:** Our search query and reverse image tools are provided solely for investigating unauthorized brand impersonation, copyright infringement, and digital trademark misuse of your own proprietary assets. Users must not use these utilities to identify, surveil, or track private individuals.

---

## 3. Implementation Plan Upon Approval
Once approved by the site owner, this text will be incorporated into `src/app/privacy-policy/page.tsx` under a new section titled `Free Utilities & Image Search Privacy` without modifying any other legal guarantees.
