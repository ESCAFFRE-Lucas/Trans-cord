stop-dev:
	docker-compose -f docker-compose.dev.yml down

start-dev:
	docker-compose -f docker-compose.dev.yml down
	docker-compose -f docker-compose.dev.yml up -d

start-redis:
	docker-compose -f docker-compose.dev.yml up -d redis