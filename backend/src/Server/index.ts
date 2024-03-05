import { db, app } from './app'

if (process.env.NODE_ENV !== 'TEST') {
    db.then(() => {
        app.listen(5050, () => console.log('Server is listening on port 5050'))
    })
}
