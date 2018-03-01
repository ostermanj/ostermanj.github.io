 /* exported Sharc, Helpers, d3Tip, reflect, arrayFind, SVGInnerHTML, SVGFocus */ // let's jshint know that D3Charts can be "defined but not used" in this file
 /* polyfills needed: Promise TO DO: OTHERS?
 */

import { reflect, arrayFind, SVGInnerHTML, SVGFocus } from '../js-vendor/polyfills';
import { Helpers } from '../js-exports/Helpers';
import { d3Tip } from '../js-vendor/d3-tip';

(function(){ 
 
"use strict";  
    const groupId = '2127948';
    var controller = {
        init(){
            this.getZoteroMeta();
            console.log(model.zoteroItems);
        },
        getZoteroMeta(){ // the API will return only 100 results at a time
                          // initially make three requests to cover the 282 original items
                          // the requests can be made async, without waiting for each to return before calling the other
                          // last one checks to make sure the hard-coded three requests are enough. if not, does it again.
            var metaPromise = new Promise((resolve,reject) => {
                d3.json('https://api.zotero.org/groups/' + groupId, (error,data) => { 
                    if (error) {
                        reject(error);
                        throw error;
                    }
                    resolve(data); 
                });
            });
            metaPromise.then(data => {
                console.log(data);
                this.getZoteroItems(data.meta.numItems);
            });
            /*function fetch(i){
                console.log('https://api.zotero.org/groups/' + groupId + '/items/top?limit=100&start=' + ( i * 100 ));
                 d3.json('https://api.zotero.org/groups/' + groupId + '/items/top?limit=100&start=' + ( i * 100 ), function(data){
                    console.log(data.length);
                    model.zoteroItems.push(...data);
                });
            }
            for ( let index = 0; index < 3; index++){
                fetch(index);
            }*/
        },
        getZoteroItems(length){
            console.log(length);
            var dataPromises = [];
            var maxLoop = Math.ceil(length / 100);
            
            function constructPromise(i){
                console.log(i);
                var promise = new Promise((resolve,reject) => {
                    d3.json('https://api.zotero.org/groups/' + groupId + '/items?limit=100&start=' + ( i * 100 ), (error,data) => { 
                        if (error) {
                            reject(error);
                            throw error;
                        }
                        resolve(data); 
                    });
                });
                return promise;
            }

            for ( let i = 0; i < maxLoop; i++ ){
                dataPromises.push(constructPromise(i));
            }
            Promise.all(dataPromises).then(data => {
                console.log(data);
            });
        }

        // TO DO: 
    };

    var model = {
        zoteroItems: []
    };

    controller.init();
     
}()); // end IIFE 