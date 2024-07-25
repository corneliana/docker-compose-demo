-- Check if role exists, if not create it
DO
$do$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'username') THEN
        CREATE ROLE username WITH LOGIN PASSWORD 'password';
    END IF;
END
$do$;

-- Check if database exists, if not create it
DO
$do$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_database WHERE datname = 'tododb') THEN
        CREATE DATABASE tododb OWNER username;
    END IF;
END
$do$;

-- Connect to the tododb database
\c tododb

-- Create the tasks table if it does not exist
DO
$do$
BEGIN
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'tasks') THEN
        CREATE TABLE tasks (
            id SERIAL PRIMARY KEY,
            description VARCHAR(255) NOT NULL
        );
        RAISE NOTICE 'Table "tasks" has been successfully created.';
    ELSE
        RAISE NOTICE 'Table "tasks" already exists.';
    END IF;
END
$do$;
