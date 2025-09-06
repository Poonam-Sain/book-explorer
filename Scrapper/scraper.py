import requests
from bs4 import BeautifulSoup
import mysql.connector

# Connect to MySQL
conn = mysql.connector.connect(
    host='localhost',
    user='root',
    password='Hansika@1978',
    database='book_explorer'
)
cursor = conn.cursor()

# Scraper function
def scrape_page(url):
    res = requests.get(url)
    res.encoding = 'utf-8' 
    soup = BeautifulSoup(res.text, 'html.parser')
    books = []
    rating_dict = {'One':1,'Two':2,'Three':3,'Four':4,'Five':5}
    for book in soup.select('.product_pod'):
        title = book.h3.a['title']
        price = float(book.select_one('.price_color').text.replace('£',''))
        stock = book.select_one('.availability').text.strip()
        rating = rating_dict[book.select_one('.star-rating')['class'][1]]
        # Make absolute URLs
        detail_url = "https://books.toscrape.com/catalogue/" + book.h3.a['href']
        thumbnail = "https://books.toscrape.com/" + book.img['src'].replace('../', '')
        books.append((title, price, stock, rating, detail_url, thumbnail))
    return books

# Save to DB
def save_books(book_list):
    for book in book_list:
        cursor.execute(
            "INSERT INTO books (title, price, stock, rating, detail_url, thumbnail_url) VALUES (%s,%s,%s,%s,%s,%s)",
            book
        )
    conn.commit()

# Loop through all pages
for i in range(1,51):
    books = scrape_page(f'https://books.toscrape.com/catalogue/page-{i}.html')
    save_books(books)
    print(f'Page {i} done')

conn.close()
