FROM python:3.11
WORKDIR /app
COPY ./req.txt /app/req.txt
RUN pip install --no-cache-dir --upgrade -r /app/req.txt
COPY ./ /app
EXPOSE 9000
CMD ["python", "/app/main.py", "op"]