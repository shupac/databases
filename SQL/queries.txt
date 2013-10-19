mysql> select messages.text, users.name, rooms.name from messages join users on messages.user_id = users.id join rooms on messages.room_id = rooms.id;
+-------------+------+-------+
| text        | name | name  |
+-------------+------+-------+
| Hello World | Shu  | lobby |
+-------------+------+-------+

mysql> select * from messages join users on messages.user_id = users.id join rooms on messages.room_id = rooms.id;
+----+---------+-------------+---------------------+---------+----+------+----+-------+
| id | User_ID | Text        | Timestamp           | Room_ID | id | Name | id | Name  |
+----+---------+-------------+---------------------+---------+----+------+----+-------+
|  3 |       1 | Hello World | 2013-10-18 16:35:42 |       1 |  1 | Shu  |  1 | lobby |
+----+---------+-------------+---------------------+---------+----+------+----+-------+

insert into messages
(User_ID, Text, Timestamp, Room_ID) values
(1, 'Hello World', CURRENT_TIMESTAMP, 1);

select users.name, messages.text, rooms.name, messages.timestamp from messages join users on messages.user_id = users.id join rooms on messages.room_id = rooms.id;