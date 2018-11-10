use sakila;
# 1a
SELECT first_name, last_name FROM actor;
# 1b
SELECT Concat(first_name, ' ', last_name) as 'Actor Name' FROM actor;
# 2a
SELECT actor_id, first_name, last_name 
	FROM actor
WHERE first_name LIKE 'Joe';
# 2b
SELECT actor_id, first_name, last_name 
	FROM actor
WHERE last_name LIKE '%GEN%';
# 2c
SELECT actor_id, first_name, last_name 
	FROM actor
    WHERE last_name LIKE '%LI%'
order by last_name, first_name;
# 2d
SELECT country_id, country from country
	where country in ('Afghanistan', 'Bangladesh', 'China');
# 3a
ALTER TABLE actor
ADD description BLOB;
# 3b
ALTER TABLE actor
DROP COLUMN description; 
# 4a
SELECT last_name, count(last_name) FROM actor
GROUP BY last_name;
# 4b
SELECT last_name, count(last_name) FROM actor
	GROUP BY last_name
having count(last_name) > 1;
# 4c
UPDATE actor
	SET first_name = 'Harpo'
WHERE first_name = 'Groucho' AND last_name = 'Williams';
# 4d
UPDATE actor
	SET first_name = 'Groucho'
WHERE first_name = 'Harpo' AND last_name = 'Williams';
# 5a
SHOW CREATE TABLE sakila.address;
# 6a
SELECT staff.first_name, staff.last_name, address.address_id
	FROM address
INNER JOIN staff ON staff.address_id = address.address_id;
# 6b
SELECT staff.first_name, sum(payment.amount)
	FROM staff
INNER JOIN payment ON staff.staff_id = payment.staff_id
	WHERE payment.payment_date >= '2005-08-01' and payment.payment_date < '2005-09-01' 
GROUP by 1;
# 6c
SELECT film.title, count(film_actor.actor_id)
	FROM film_actor
INNER JOIN film ON film.film_id = film_actor.film_id
	GROUP by 1;
# 6d
SELECT film.title, count(inventory.film_id)
	FROM film
INNER JOIN inventory ON inventory.film_id = film.film_id
	WHERE film.title = 'Hunchback Impossible' 
GROUP by 1;
# 6e
SELECT customer.first_name, customer.last_name, sum(payment.amount)
	FROM payment
INNER JOIN customer ON customer.customer_id = payment.customer_id
	GROUP BY 1, 2
ORDER BY 2;
# 7a
SELECT * FROM film;
SELECT title FROM film
	WHERE  (title LIKE 'K%' or title LIKE 'Q%' ) 
    and language_id = (SELECT language_id FROM language WHERE name='English');
# 7b
SELECT actor.first_name, actor.last_name FROM actor
	WHERE actor_id IN (SELECT actor_id FROM film_actor 
    WHERE film_id = (SELECT film_id FROM film WHERE title='Alone Trip'));
# 7c
SELECT customer.first_name, customer.last_name, 
customer.email, customer.address_id, address.city_id, 
city.country_id, country.country
	FROM customer
LEFT JOIN address ON customer.address_id = address.address_id
INNER JOIN city ON address.city_id = city.city_id
INNER JOIN country ON country.country_id = city.country_id
	WHERE country.country = 'Canada';
# 7d
SELECT film.title, film_category.category_id, category.name
	FROM film
LEFT JOIN film_category ON film_category.film_id = film.film_id
INNER JOIN category ON film_category.category_id = category.category_id
	WHERE category.name='family';
# 7e
SELECT film.title, film.rental_rate
	FROM film
ORDER BY 2 DESC;
# 7f
SELECT store.store_id, sum(payment.amount)
	FROM store
LEFT JOIN staff ON store.store_id = staff.store_id
INNER JOIN payment ON payment.staff_id = staff.staff_id
GROUP BY store.store_id;
# 7g
SELECT store.store_id, city.city, country.country
	FROM store
LEFT JOIN address ON address.address_id = store.address_id
INNER JOIN city ON address.city_id = city.city_id
INNER JOIN country ON country.country_id = city.country_id;
# 7h
SELECT category.name, sum(payment.amount)
	FROM category
LEFT JOIN film_category ON film_category.category_id = category.category_id
INNER JOIN inventory ON film_category.film_id = inventory.film_id
INNER JOIN rental ON inventory.inventory_id = rental.inventory_id
INNER JOIN payment ON payment.rental_id = rental.rental_id
	GROUP BY 1 LIMIT 5;
# 8a
CREATE VIEW Top_5_Revenue_by_Genre
AS SELECT category.name, sum(payment.amount)
	FROM category
LEFT JOIN film_category ON film_category.category_id = category.category_id
INNER JOIN inventory ON film_category.film_id = inventory.film_id
INNER JOIN rental ON inventory.inventory_id = rental.inventory_id
INNER JOIN payment ON payment.rental_id = rental.rental_id
	GROUP BY 1 LIMIT 5;
# 8b
SELECT * FROM Top_5_Revenue_by_Genre;
# 8c
DROP VIEW Top_5_Revenue_by_Genre;