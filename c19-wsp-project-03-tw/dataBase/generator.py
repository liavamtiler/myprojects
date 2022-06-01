from bs4 import BeautifulSoup
import requests
from csv import writer
import csv


texturl = "http://www.thisone.com.hk/product/pr-%e9%88%a3%e8%b3%aa%e6%b0%b4%e6%b3%a1%e9%a4%85-64g/"
imageurl = "http://www.thisone.com.hk/product/nisshin-%E7%84%A1%E6%B7%BB%E5%8A%A0-%E4%B8%80%E5%8F%A3%E9%9B%9E%E6%9F%B3%E4%B9%BE-50g/"
page = requests.get(texturl)
page1 = requests.get(imageurl)

textsoup = BeautifulSoup(page.content, 'html.parser')
imagesoup = BeautifulSoup(page1.content, 'html.parser')

results = textsoup.find_all('div', class_="product-type-simple")
images = imagesoup.find_all('img')

with open('myCsv.csv', 'a', newline="", encoding="utf8") as f:
     thewriter = csv.writer(f)
     for image in images:
      name = image['alt']
      link = image['src']
      print(link)

     for result in results:
         generalTitle = result.find(
             'h1', itemprop="name").text
         arrayContainer = generalTitle.split()
         title = arrayContainer[1]
         brand = arrayContainer[0]
         weight = arrayContainer[2]
         price = result.find('span', class_="amount").text.replace('\n', '')
         generalDescription = result.find(
             'div', itemprop='description').text.replace('\n', '')
         description = generalDescription[6:]
         array = [title, brand, weight, price, description, link]
         thewriter.writerow(array)
