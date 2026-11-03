CREATE TABLE IF NOT EXISTS blogs (
  id SERIAL PRIMARY KEY,
  author VARCHAR(255),
  url VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  likes INTEGER DEFAULT 0,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

INSERT INTO blogs (author, url, title, likes, "createdAt", "updatedAt")
VALUES
  ('Grace Hopper', 'https://example.org/grace', 'Learning SQL', 5, NOW(), NOW()),
  ('Katherine Johnson', 'https://example.org/katherine', 'Working with data', 7, NOW(), NOW());
