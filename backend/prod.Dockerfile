FROM golang:alpine as builder

ENV GIN_MODE=release

RUN mkdir /app
WORKDIR /app

COPY ./go.mod /app/
COPY ./go.sum /app/
RUN go mod download

COPY . /app
RUN go build -o vrecipes ./cmd/vrecipes/main.go

FROM alpine

COPY --from=builder /app/vrecipes /vrecipes

ENTRYPOINT ["/vrecipes"]