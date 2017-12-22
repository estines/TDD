let fs = require('fs')
let filename = { json: 'homework1-4.json', eyes: 'homework5-1_eyes.json', genders: 'homework5-1_gender.json', friends: 'homework5-1_friends.json' }

// Open selected file and return data in file back to variable
let readFiles = keyword => {
    return new Promise((resolve, reject) => {
        fs.readFile(filename[keyword], 'utf8', (err, data) => {
            if (err) reject(err)
            else resolve(JSON.parse(data))
        })
    })
}

// Create new object by using filter and send object to create file
let createObject = (keyword, profiles) => {
    let newObj
    if (keyword == 'eyes') {
        newObj = objectCount('eyeColor', profiles, { brown: 0, green: 0, blue: 0 })
    }
    else if (keyword == 'genders') {
        newObj = objectCount('gender', profiles, { male: 0, female: 0 })
    }
    else if (keyword == 'friends') {
        newObj = frinedsFilter(profiles)
    }
    writeFiles(keyword, newObj)
}

// Create new file using data from object
let writeFiles = (keyword, object) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename[keyword], JSON.stringify(object), 'utf-8', (err) => {
            if (err) reject(err)
            else resolve()
        })
    })
}

// Check keyword in profiles then plus 1 keyword value in object
let objectCount = (keyword, profiles, initial = {}) => {
    profiles.forEach( person => {
        Object.keys(initial).forEach(key => {
            if (person[keyword] == key) {
                initial[key] += 1
            }
        })
    })
    return initial
}

// Filter selected friends field then create new object and return
let frinedsFilter = profiles => {
    let friendsObject = []
    profiles.forEach(person => {
        let object = {}
        object['_id'] = person._id
        object['friendCount'] = person.friends.length
        friendsObject.push(object)
    })
    return friendsObject
}

// Get JSON data and send to createObject function
let executeData = async keyword => {
    try {
        let Objects = await readFiles('json')
        createObject(keyword, Objects)
    }
    catch (error) {
        console.error(error)
    }
}

// Call executeData using all key in filename
Object.keys(filename).slice(1).forEach(keyword => executeData(keyword) )

// Export function and variable
module.exports = {
    readFiles, // Shorthand -> { Key:Value } is equal
    filename
}