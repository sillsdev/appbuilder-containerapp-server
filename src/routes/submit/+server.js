import { addDoc, collection } from 'firebase/firestore';
import { allKeys, initKeys } from '$lib/stores/keys.js';
import { allPackages, initPackages } from '$lib/stores/packages.js';
import { db } from '$lib/fbconfig.js';

export async function POST( {request} ) {
    await initKeys();

    let valid = false;

    const bearer = request.headers.get('authorization');

    allKeys.subscribe( keys => {
        keys.forEach(key => {
            if( bearer.includes( key.key ) ){
                valid = true;
            } 
        })
    });

    if(valid){
        const pack = await request.json();
        console.log("json received");
        allPackages.set({
            ...allPackages,
            pack
        });
        
        const col = collection(db, 'packages');
        await addDoc( col, {
            accepted: '',
            ...pack
        });
        console.log("doc pushed to database");

        await initPackages();
        console.log("packs refreshed");    
        return new Response(201);
    } else {
        return new Response(401);
    }
}