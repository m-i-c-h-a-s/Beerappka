FROM python:3.7.12-slim-buster as base

ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

FROM base AS python-deps

RUN apt-get update \
  && apt-get -y install --no-install-recommends gcc \
  && apt-get clean

COPY Pipfile .
COPY Pipfile.lock .

RUN pip install pipenv

RUN PIPENV_VENV_IN_PROJECT=1 pipenv install --deploy

FROM base AS runtime

RUN apt-get update \
  && apt-get -y install netcat postgresql libpq-dev python3-dev musl-dev \
  && apt-get clean

COPY --from=python-deps /.venv /.venv
ENV PATH="/.venv/bin:$PATH"

RUN useradd --create-home backend
WORKDIR /home/backend

COPY ./entrypoint.sh /home/backend/entrypoint.sh
RUN chmod +x /home/backend/entrypoint.sh

COPY . .

USER backend

ENTRYPOINT ["/home/backend/entrypoint.sh"]
