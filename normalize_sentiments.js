// change value in a doc embedded in an array in the parent document


db.getCollection('pages_post_collection').update(
{
    $and: [
        {"comments.comment_list.1": {$exists: true}},
        {"comments.comment_list.sentiment": {$lte: -1}}
    ]
},
{
    $set: {"comments.comment_list.$[comment].sentiment": 1}
},
{
    multi: true,
    arrayFilters: [
        {
            "comment": {$exists: true},
            "comment.sentiment": {$lte: -1}
        }
    ]
} 
);
    
db.getCollection('pages_post_collection').update(
    {
        $and: [
            {"comments.comment_list.1": {$exists: true}},
            {"comments.comment_list.sentiment": {$gte: 2}}
        ]
    },
    {
        $set: {"comments.comment_list.$[comment].sentiment": 0}
    },
    {
        multi: true,
        arrayFilters: [
            {
                "comment": {$exists: true},
                "comment.sentiment": {$gte: 2}
            }
        ]
    } 
    );


// same thing 2 levels deep

db.getCollection('pages_post_collection').update(
{
    $and: [
        {"comments.comment_list.replies.1": {$exists: true}},
        {"comments.comment_list.replies.sentiment": {$lte: -1}}
    ]
},
{
    $set: {"comments.comment_list.$[comment].replies.$[reply].sentiment": 1}
},
{
    multi: true,
    arrayFilters: [
        {
            "comment": {$exists: true},
        },
        {
            "reply": {$exists: true},
            "reply.sentiment": {$lte: -1}
        }
    ]
} 
);

db.getCollection('pages_post_collection').update(
{
    $and: [
        {"comments.comment_list.replies.1": {$exists: true}},
        {"comments.comment_list.replies.sentiment": {$gte: 2}}
    ]
},
{
    $set: {"comments.comment_list.$[comment].replies.$[reply].sentiment": 0}
},
{
    multi: true,
    arrayFilters: [
        {
            "comment": {$exists: true},
        },
        {
            "reply": {$exists: true},
            "reply.sentiment": {$gte: 2}
        }
    ]
} 
);