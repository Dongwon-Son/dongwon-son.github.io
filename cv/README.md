# CV Source

This folder contains the LaTeX source for Dongwon Son's CV.

Build the stable PDF used by the website with:

```bash
latexmk -pdf -outdir=/tmp/dongwon_cv_build -jobname=CV_Dongwon_Son cv/Dongwon_Son_CV.tex
cp /tmp/dongwon_cv_build/CV_Dongwon_Son.pdf assets/pdf/CV_Dongwon_Son.pdf
```

The homepage and `/cv/` page link to `assets/pdf/CV_Dongwon_Son.pdf`.
