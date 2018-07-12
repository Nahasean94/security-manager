import idb from "idb"


export const dbPromise = idb.open('security-manager', 1, function (upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains('guards')) {
        const peopleOS = upgradeDb.createObjectStore('guards', {keyPath: 'guard_id'})
        peopleOS.createIndex('guard_id', 'guard_id', {unique: true})
    }
    if (!upgradeDb.objectStoreNames.contains('attendance')) {
        const peopleOS = upgradeDb.createObjectStore('attendance', {keyPath: 'guard_id'})
        peopleOS.createIndex('guard_id', 'guard_id', {unique: false})
    }
})