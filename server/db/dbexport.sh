rm db/collections/questions.json
rm db/collections/users.json
rm db/collections/images.json


mongoexport --db=TLMQuiz --collection=questions --type=json --out=db/collections/questions.json --pretty
mongoexport --db=TLMQuiz --collection=users --type=json --out=db/collections/users.json --pretty
mongoexport --db=TLMQuiz --collection=images --type=json --out=db/collections/images.json --pretty
