build:
	docker build -t hedonism:latest .
dev:
	docker run \
		--rm \
		-d \
		-e MODE=development \
		-p 8080:8080 \
		-v .:/var/www/app \
		--name hedonism hedonism:latest
prod:
	docker run \
		--rm \
		-d \
		-e MODE=production \
		-p 8080:8080 \
		-v .:/var/www/app \
		--name hedonism hedonism:latest
stop:
	docker container stop hedonism