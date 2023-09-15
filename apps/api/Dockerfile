FROM python:3.11
WORKDIR /app
COPY ./req.txt /app/req.txt
RUN pip install --no-cache-dir --upgrade -r /app/req.txt
EXPOSE 9000
COPY ./ /app
CMD ["python", "main.py"]