import {writable} from "svelte/store";

import { collection, query, where, getDocs } from '@firebase/firestore';
import { db } from "../firebase";

const q = query(collection(db, "languages"), where( "date_accepted", "!=", null ));
/**
 * @type {never[]}
 */

export let languages = [];

const querySnapshot = await getDocs(q);
querySnapshot.forEach( (doc) => {
    console.log( doc.id, " => ", doc.data() );
});

