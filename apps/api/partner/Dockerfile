FROM golang as builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . ./
RUN GOOS=linux go build -o ./build .

FROM ubuntu
ADD ./internal/adapters/db/postgres/migrations /migrations
COPY --from=builder /app/build /home/citycard/app
EXPOSE 8080 8080
CMD ["./home/citycard/app"]
