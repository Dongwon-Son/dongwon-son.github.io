# Repository Handoff

- Keep the editable CV source in `cv/Dongwon_Son_CV.tex` and publish the generated PDF at `assets/pdf/CV_Dongwon_Son.pdf`.
- Keep CV education, experience, and publications in reverse chronological order (most recent first).
- Keep publication metadata in `_bibliography/papers.bib`; update `_pages/publications.md` when adding a publication year not already listed.
- Use `uv` or a Conda environment when Python tooling is needed.
- Maintain `/Users/dongwon/experiment_processes.md` for experiment-related work.

## KAIST Machines

- `machine1`: `ssh dongwon@dongwon-ws -p 443`, work under `/vol2/research/`.
- `machine2`: `ssh dongwon@137.68.192.128` or `ssh machine2`, work under `/home/ssd4T/dongwon/`.
- `machine3`: `ssh user@machine3-2`, work under `~/research/`.
- `machine3-3`: `ssh user@machine3-3`.
- `machine6`: `ssh dongwon@machine6`, work under `~/research/`.

Get the user's approval before using `machine4`, `machine5`, or `b200`.

- `machine4`: `ssh machine4`, work under `/data/dongwon`, and use only GPU 4.
- `machine5`: `ssh machine5`, work under `/mnt/DATA/dongwonson`.
- `b200`: `ssh b200`, work under `/NHNHOME/dongwons`; avoid changing admin-account configuration and keep changes under that directory.
