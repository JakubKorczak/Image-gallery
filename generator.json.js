[
    {
        'repeat(29)': {
            id: '{{objectId()}}',
            name: function () {
                var integer = Math.floor(Math.random() * (12 - 6 + 1)) + 6;
                return lorem(integer, "words");
            },
            imageRelativePath: function (tags, parent, index){
                var id = index + 1
                return 'assets/image (' + id + ').jpg'
            },
            timestamp: function () {
                return date(new Date(2014, 0, 1), new Date()).getTime();
            }
        }
    }
]

/***
 * https://next.json-generator.com/V1DA-a_-N
 ***/
