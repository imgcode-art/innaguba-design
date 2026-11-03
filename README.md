# Inna Guba Design — design.innaguba.com

Static site (HTML + CSS + a few lines of JS, no build step). Fonts and images are self-hosted.

```
index.html              homepage
work/innaguba.html      case study: innaguba.com
work/topenivcajku.html  case study: topenivcajku.com
imprint.html            Impressum
privacy.html            GDPR privacy policy
assets/css/main.css     all shared styles (palette tokens at the top; ?theme=warm previews the old walnut palette)
assets/css/case.css     case-study blocks
assets/js/main.js       scroll reveal, header-height anchor offset
assets/fonts/           Newsreader, Inter, Jost, Cormorant Garamond (woff2)
cv/                     one-page CV (PDF)
```

## Preview locally
```
python3 -m http.server 8102
# open http://localhost:8102
```

## Deploy
GitHub Pages from `main` (root). Custom domain in `CNAME`: `design.innaguba.com`.
DNS (Cloudflare, zone innaguba.com): `CNAME design → imgcode-art.github.io`, DNS only (grey cloud).
