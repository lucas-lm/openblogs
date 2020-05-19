# openblogs

A nice and very simple REST API for writing articles.
Write, read, publish, share. Openblogs is for everyone!

## Resources

| Route                     | Method | Authorization | Data                          |
| ------------------------- | ------ | ------------- | ----------------------------- |
| /users                    | GET    | Public        | List of all users             |
| /users/<userId>           | GET    | Public        | Specific user by id           |
| /users/<userId>/artcicles | GET    | Public        | Articles from a specific user |
| /articles                 | GET    | Public        | List of all articles          |
| /articles/<articleId>     | GET    | Public        | Specific article by id        |
