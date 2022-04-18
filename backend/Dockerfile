FROM python:3.6

RUN pip install --upgrade pip
COPY ./ ./
RUN pip install -r requirements.txt
RUN pip install gunicorn
