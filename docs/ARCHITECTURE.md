# Architecture Overview

```text
Browser
   |
   v
Next.js / React UI
   |
   +---- Static pages and interactive visualizations
   |
   +---- Assessment intake
              |
              v
        /api/assessment.php
              |
        +-----+----------------+
        |                      |
        v                      v
 Lead notification      Confirmation email
 integration            service
        |                      |
        +----------+-----------+
                   |
          External credentials
          (not in public repo)
```

## Front End
Next.js `app/` routes with reusable components in `components/`.

## Assessment Backend
The PHP endpoint is included under `public/api/assessment.php` so it can be deployed alongside the static export on PHP-capable hosting.

## Secret Boundary
Authentication material is stored outside the public web root or provided through environment variables.
