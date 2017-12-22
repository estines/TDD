let { readFiles, filename } = require('./homework5-1.js')
let fs = require('fs')
let assert = require('assert')

describe('TDD lab', () => {
    describe('#readFile()', () => {
        it('Should be read content in selected file', async () => {
            const data = await readFiles('json')
            let friendsKeys = ['id', 'name']

            data.forEach(person => {
                person.friends.forEach(friend => {
                    assert.deepEqual(Object.keys(friend), friendsKeys)
                })
            })
        })
    })

    describe('#checkFileExits()', () => {
        it('Should have homework5-1_eyes.json', () => {

            assert.ok(fs.existsSync('homework5-1_eyes.json'), 'file name \'homework5-1_eyes.json\' not found')
        })
        it('Should have homework5-1_gender.json', () => {

            assert.ok(fs.existsSync('homework5-1_gender.json'), 'file name \'homework5-1_gender.json\' not found')
        })
        it('Should have homework5-1_friends.json', () => {

            assert.ok(fs.existsSync('homework5-1_friends.json'), 'file name \'homework5-1_friends.json\' not found')
        })
    })

    describe('#checkObjectKey()', () => {
        it('Should have same object key structure as homework5-1_eyes.json', async () => {
            const data = await readFiles('eyes')
            let dataKeys = Object.keys(data)
            let eyeKeys = ['brown', 'green', 'blue']

            assert.deepEqual(dataKeys, eyeKeys, ' Objecct key invalid in filename = \'homework5-1_eyes.json\'')

        })
        it('Should have same object key structure as homework5-1_gender.json', async () => {
            const data = await readFiles('genders')
            let dataKeys = Object.keys(data)
            let genderKeys = ['male', 'female']

            assert.deepEqual(dataKeys, genderKeys, ' Objecct key invalid in filename = \'homework5-1_gender.json\'')

        })
        it('Should have same object key structure as homework5-1_friends.json', async () => {
            const data = await readFiles('friends')
            let dataKeys = Object.keys(data[0])
            let friendKeys = ['_id', 'friendCount']

            assert.deepEqual(dataKeys, friendKeys, ' Objecct key invalid in filename = \'homework5-1_friends.json\'')
        
        })
    })

    describe('#userFriendCount()', () => {
        it('should have size of array input as 23', async () => {
            const data = await readFiles('friends')
            assert.equal(data.length,23,'Invaid size of arrays')
        })
    })
    describe('#sumOfEyes()', () => {
        it('should have sum of eyes as 23', async () => {
            const data = await readFiles('eyes')
            dataCount = 0
            for ( let color in data ) {
                dataCount += data[color]
            }
            assert.equal(dataCount,23,'Invaid sum of eyes')
        })
    })
    describe('#sumOfGender()', () => {
        it('should have sum of gender as 23', async () => {
            const data = await readFiles('genders')
            dataCount = 0
            for (let gender in data) {
                dataCount += data[gender]
            }
            assert.equal(dataCount,23,'Invalid sum of genders')
        })
    })
})