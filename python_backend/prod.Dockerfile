FROM python:3-alpine

RUN apk update && apk add postgresql-bdr-client postgresql-dev build-base shadow

WORKDIR /usr/src/vrecipes/backend

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

RUN apk del build-base postgresql-dev

RUN useradd vrecipes

COPY . .

RUN chown -R vrecipes /usr/src/vrecipes/backend

USER vrecipes

ENV FLASK_ENV production

EXPOSE 5000

CMD ["sh", "start.sh"]