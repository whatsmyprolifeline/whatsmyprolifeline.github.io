/**
 * BEGIN LUNR CODE
 */

/**
 * lunr - http://lunrjs.com - A bit like Solr, but much smaller and not as bright - 2.3.5
 * Copyright (C) 2018 Oliver Nightingale
 * @license MIT
 * (Minified from original)
 */

!function(){var e,t,r,i,n,s,o,a,u,l,c,d,h,f,p,y,m,g,x,v,w,Q,k,S,E,L,b,P,T=function(e){var t=new T.Builder;return t.pipeline.add(T.trimmer,T.stopWordFilter,T.stemmer),t.searchPipeline.add(T.stemmer),e.call(t,t),t.build()};T.version="2.3.5",T.utils={},T.utils.warn=(e=this,function(t){e.console&&console.warn&&console.warn(t)}),T.utils.asString=function(e){return void 0===e||null===e?"":e.toString()},T.utils.clone=function(e){if(null===e||void 0===e)return e;for(var t=Object.create(null),r=Object.keys(e),i=0;i<r.length;i++){var n=r[i],s=e[n];if(Array.isArray(s))t[n]=s.slice();else{if("string"!=typeof s&&"number"!=typeof s&&"boolean"!=typeof s)throw new TypeError("clone is not deep and does not support nested objects");t[n]=s}}return t},T.FieldRef=function(e,t,r){this.docRef=e,this.fieldName=t,this._stringValue=r},T.FieldRef.joiner="/",T.FieldRef.fromString=function(e){var t=e.indexOf(T.FieldRef.joiner);if(-1===t)throw"malformed field ref string";var r=e.slice(0,t),i=e.slice(t+1);return new T.FieldRef(i,r,e)},T.FieldRef.prototype.toString=function(){return void 0==this._stringValue&&(this._stringValue=this.fieldName+T.FieldRef.joiner+this.docRef),this._stringValue},T.Set=function(e){if(this.elements=Object.create(null),e){this.length=e.length;for(var t=0;t<this.length;t++)this.elements[e[t]]=!0}else this.length=0},T.Set.complete={intersect:function(e){return e},union:function(e){return e},contains:function(){return!0}},T.Set.empty={intersect:function(){return this},union:function(e){return e},contains:function(){return!1}},T.Set.prototype.contains=function(e){return!!this.elements[e]},T.Set.prototype.intersect=function(e){var t,r,i,n=[];if(e===T.Set.complete)return this;if(e===T.Set.empty)return e;this.length<e.length?(t=this,r=e):(t=e,r=this),i=Object.keys(t.elements);for(var s=0;s<i.length;s++){var o=i[s];o in r.elements&&n.push(o)}return new T.Set(n)},T.Set.prototype.union=function(e){return e===T.Set.complete?T.Set.complete:e===T.Set.empty?this:new T.Set(Object.keys(this.elements).concat(Object.keys(e.elements)))},T.idf=function(e,t){var r=0;for(var i in e)"_index"!=i&&(r+=Object.keys(e[i]).length);var n=(t-r+.5)/(r+.5);return Math.log(1+Math.abs(n))},T.Token=function(e,t){this.str=e||"",this.metadata=t||{}},T.Token.prototype.toString=function(){return this.str},T.Token.prototype.update=function(e){return this.str=e(this.str,this.metadata),this},T.Token.prototype.clone=function(e){return e=e||function(e){return e},new T.Token(e(this.str,this.metadata),this.metadata)},T.tokenizer=function(e,t){if(null==e||void 0==e)return[];if(Array.isArray(e))return e.map(function(e){return new T.Token(T.utils.asString(e).toLowerCase(),T.utils.clone(t))});for(var r=e.toString().trim().toLowerCase(),i=r.length,n=[],s=0,o=0;s<=i;s++){var a=s-o;if(r.charAt(s).match(T.tokenizer.separator)||s==i){if(a>0){var u=T.utils.clone(t)||{};u.position=[o,a],u.index=n.length,n.push(new T.Token(r.slice(o,s),u))}o=s+1}}return n},T.tokenizer.separator=/[\s\-]+/,T.Pipeline=function(){this._stack=[]},T.Pipeline.registeredFunctions=Object.create(null),T.Pipeline.registerFunction=function(e,t){t in this.registeredFunctions&&T.utils.warn("Overwriting existing registered function: "+t),e.label=t,T.Pipeline.registeredFunctions[e.label]=e},T.Pipeline.warnIfFunctionNotRegistered=function(e){e.label&&e.label in this.registeredFunctions||T.utils.warn("Function is not registered with pipeline. This may cause problems when serialising the index.\n",e)},T.Pipeline.load=function(e){var t=new T.Pipeline;return e.forEach(function(e){var r=T.Pipeline.registeredFunctions[e];if(!r)throw new Error("Cannot load unregistered function: "+e);t.add(r)}),t},T.Pipeline.prototype.add=function(){Array.prototype.slice.call(arguments).forEach(function(e){T.Pipeline.warnIfFunctionNotRegistered(e),this._stack.push(e)},this)},T.Pipeline.prototype.after=function(e,t){T.Pipeline.warnIfFunctionNotRegistered(t);var r=this._stack.indexOf(e);if(-1==r)throw new Error("Cannot find existingFn");r+=1,this._stack.splice(r,0,t)},T.Pipeline.prototype.before=function(e,t){T.Pipeline.warnIfFunctionNotRegistered(t);var r=this._stack.indexOf(e);if(-1==r)throw new Error("Cannot find existingFn");this._stack.splice(r,0,t)},T.Pipeline.prototype.remove=function(e){var t=this._stack.indexOf(e);-1!=t&&this._stack.splice(t,1)},T.Pipeline.prototype.run=function(e){for(var t=this._stack.length,r=0;r<t;r++){for(var i=this._stack[r],n=[],s=0;s<e.length;s++){var o=i(e[s],s,e);if(void 0!==o&&""!==o)if(Array.isArray(o))for(var a=0;a<o.length;a++)n.push(o[a]);else n.push(o)}e=n}return e},T.Pipeline.prototype.runString=function(e,t){var r=new T.Token(e,t);return this.run([r]).map(function(e){return e.toString()})},T.Pipeline.prototype.reset=function(){this._stack=[]},T.Pipeline.prototype.toJSON=function(){return this._stack.map(function(e){return T.Pipeline.warnIfFunctionNotRegistered(e),e.label})},T.Vector=function(e){this._magnitude=0,this.elements=e||[]},T.Vector.prototype.positionForIndex=function(e){if(0==this.elements.length)return 0;for(var t=0,r=this.elements.length/2,i=r-t,n=Math.floor(i/2),s=this.elements[2*n];i>1&&(s<e&&(t=n),s>e&&(r=n),s!=e);)i=r-t,n=t+Math.floor(i/2),s=this.elements[2*n];return s==e?2*n:s>e?2*n:s<e?2*(n+1):void 0},T.Vector.prototype.insert=function(e,t){this.upsert(e,t,function(){throw"duplicate index"})},T.Vector.prototype.upsert=function(e,t,r){this._magnitude=0;var i=this.positionForIndex(e);this.elements[i]==e?this.elements[i+1]=r(this.elements[i+1],t):this.elements.splice(i,0,e,t)},T.Vector.prototype.magnitude=function(){if(this._magnitude)return this._magnitude;for(var e=0,t=this.elements.length,r=1;r<t;r+=2){var i=this.elements[r];e+=i*i}return this._magnitude=Math.sqrt(e)},T.Vector.prototype.dot=function(e){for(var t=0,r=this.elements,i=e.elements,n=r.length,s=i.length,o=0,a=0,u=0,l=0;u<n&&l<s;)(o=r[u])<(a=i[l])?u+=2:o>a?l+=2:o==a&&(t+=r[u+1]*i[l+1],u+=2,l+=2);return t},T.Vector.prototype.similarity=function(e){return this.dot(e)/this.magnitude()||0},T.Vector.prototype.toArray=function(){for(var e=new Array(this.elements.length/2),t=1,r=0;t<this.elements.length;t+=2,r++)e[r]=this.elements[t];return e},T.Vector.prototype.toJSON=function(){return this.elements},T.stemmer=(t={ational:"ate",tional:"tion",enci:"ence",anci:"ance",izer:"ize",bli:"ble",alli:"al",entli:"ent",eli:"e",ousli:"ous",ization:"ize",ation:"ate",ator:"ate",alism:"al",iveness:"ive",fulness:"ful",ousness:"ous",aliti:"al",iviti:"ive",biliti:"ble",logi:"log"},r={icate:"ic",ative:"",alize:"al",iciti:"ic",ical:"ic",ful:"",ness:""},i="[aeiouy]",n="[^aeiou][^aeiouy]*",s=new RegExp("^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*"),o=new RegExp("^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*[aeiouy][aeiou]*[^aeiou][^aeiouy]*"),a=new RegExp("^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*([aeiouy][aeiou]*)?$"),u=new RegExp("^([^aeiou][^aeiouy]*)?[aeiouy]"),l=/^(.+?)(ss|i)es$/,c=/^(.+?)([^s])s$/,d=/^(.+?)eed$/,h=/^(.+?)(ed|ing)$/,f=/.$/,p=/(at|bl|iz)$/,y=new RegExp("([^aeiouylsz])\\1$"),m=new RegExp("^"+n+i+"[^aeiouwxy]$"),g=/^(.+?[^aeiou])y$/,x=/^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/,v=/^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/,w=/^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/,Q=/^(.+?)(s|t)(ion)$/,k=/^(.+?)e$/,S=/ll$/,E=new RegExp("^"+n+i+"[^aeiouwxy]$"),L=function(e){var i,n,L,b,P,T,O;if(e.length<3)return e;if("y"==(L=e.substr(0,1))&&(e=L.toUpperCase()+e.substr(1)),P=c,(b=l).test(e)?e=e.replace(b,"$1$2"):P.test(e)&&(e=e.replace(P,"$1$2")),P=h,(b=d).test(e)){var I=b.exec(e);(b=s).test(I[1])&&(b=f,e=e.replace(b,""))}else if(P.test(e)){i=(I=P.exec(e))[1],(P=u).test(i)&&(T=y,O=m,(P=p).test(e=i)?e+="e":T.test(e)?(b=f,e=e.replace(b,"")):O.test(e)&&(e+="e"))}(b=g).test(e)&&(e=(i=(I=b.exec(e))[1])+"i");(b=x).test(e)&&(i=(I=b.exec(e))[1],n=I[2],(b=s).test(i)&&(e=i+t[n]));(b=v).test(e)&&(i=(I=b.exec(e))[1],n=I[2],(b=s).test(i)&&(e=i+r[n]));if(P=Q,(b=w).test(e))i=(I=b.exec(e))[1],(b=o).test(i)&&(e=i);else if(P.test(e)){i=(I=P.exec(e))[1]+I[2],(P=o).test(i)&&(e=i)}(b=k).test(e)&&(i=(I=b.exec(e))[1],P=a,T=E,((b=o).test(i)||P.test(i)&&!T.test(i))&&(e=i));return P=o,(b=S).test(e)&&P.test(e)&&(b=f,e=e.replace(b,"")),"y"==L&&(e=L.toLowerCase()+e.substr(1)),e},function(e){return e.update(L)}),T.Pipeline.registerFunction(T.stemmer,"stemmer"),T.generateStopWordFilter=function(e){var t=e.reduce(function(e,t){return e[t]=t,e},{});return function(e){if(e&&t[e.toString()]!==e.toString())return e}},T.stopWordFilter=T.generateStopWordFilter(["a","able","about","across","after","all","almost","also","am","among","an","and","any","are","as","at","be","because","been","but","by","can","cannot","could","dear","did","do","does","either","else","ever","every","for","from","get","got","had","has","have","he","her","hers","him","his","how","however","i","if","in","into","is","it","its","just","least","let","like","likely","may","me","might","most","must","my","neither","no","nor","not","of","off","often","on","only","or","other","our","own","rather","said","say","says","she","should","since","so","some","than","that","the","their","them","then","there","these","they","this","tis","to","too","twas","us","wants","was","we","were","what","when","where","which","while","who","whom","why","will","with","would","yet","you","your"]),T.Pipeline.registerFunction(T.stopWordFilter,"stopWordFilter"),T.trimmer=function(e){return e.update(function(e){return e.replace(/^\W+/,"").replace(/\W+$/,"")})},T.Pipeline.registerFunction(T.trimmer,"trimmer"),T.TokenSet=function(){this.final=!1,this.edges={},this.id=T.TokenSet._nextId,T.TokenSet._nextId+=1},T.TokenSet._nextId=1,T.TokenSet.fromArray=function(e){for(var t=new T.TokenSet.Builder,r=0,i=e.length;r<i;r++)t.insert(e[r]);return t.finish(),t.root},T.TokenSet.fromClause=function(e){return"editDistance"in e?T.TokenSet.fromFuzzyString(e.term,e.editDistance):T.TokenSet.fromString(e.term)},T.TokenSet.fromFuzzyString=function(e,t){for(var r=new T.TokenSet,i=[{node:r,editsRemaining:t,str:e}];i.length;){var n,s,o,a=i.pop();if(a.str.length>0)(s=a.str.charAt(0))in a.node.edges?n=a.node.edges[s]:(n=new T.TokenSet,a.node.edges[s]=n),1==a.str.length&&(n.final=!0),i.push({node:n,editsRemaining:a.editsRemaining,str:a.str.slice(1)});if(a.editsRemaining>0&&a.str.length>1)(s=a.str.charAt(1))in a.node.edges?o=a.node.edges[s]:(o=new T.TokenSet,a.node.edges[s]=o),a.str.length<=2?o.final=!0:i.push({node:o,editsRemaining:a.editsRemaining-1,str:a.str.slice(2)});if(a.editsRemaining>0&&1==a.str.length&&(a.node.final=!0),a.editsRemaining>0&&a.str.length>=1){if("*"in a.node.edges)var u=a.node.edges["*"];else{u=new T.TokenSet;a.node.edges["*"]=u}1==a.str.length?u.final=!0:i.push({node:u,editsRemaining:a.editsRemaining-1,str:a.str.slice(1)})}if(a.editsRemaining>0){if("*"in a.node.edges)var l=a.node.edges["*"];else{l=new T.TokenSet;a.node.edges["*"]=l}0==a.str.length?l.final=!0:i.push({node:l,editsRemaining:a.editsRemaining-1,str:a.str})}if(a.editsRemaining>0&&a.str.length>1){var c,d=a.str.charAt(0),h=a.str.charAt(1);h in a.node.edges?c=a.node.edges[h]:(c=new T.TokenSet,a.node.edges[h]=c),1==a.str.length?c.final=!0:i.push({node:c,editsRemaining:a.editsRemaining-1,str:d+a.str.slice(2)})}}return r},T.TokenSet.fromString=function(e){for(var t=new T.TokenSet,r=t,i=0,n=e.length;i<n;i++){var s=e[i],o=i==n-1;if("*"==s)t.edges[s]=t,t.final=o;else{var a=new T.TokenSet;a.final=o,t.edges[s]=a,t=a}}return r},T.TokenSet.prototype.toArray=function(){for(var e=[],t=[{prefix:"",node:this}];t.length;){var r=t.pop(),i=Object.keys(r.node.edges),n=i.length;r.node.final&&(r.prefix.charAt(0),e.push(r.prefix));for(var s=0;s<n;s++){var o=i[s];t.push({prefix:r.prefix.concat(o),node:r.node.edges[o]})}}return e},T.TokenSet.prototype.toString=function(){if(this._str)return this._str;for(var e=this.final?"1":"0",t=Object.keys(this.edges).sort(),r=t.length,i=0;i<r;i++){var n=t[i];e=e+n+this.edges[n].id}return e},T.TokenSet.prototype.intersect=function(e){for(var t=new T.TokenSet,r=void 0,i=[{qNode:e,output:t,node:this}];i.length;){r=i.pop();for(var n=Object.keys(r.qNode.edges),s=n.length,o=Object.keys(r.node.edges),a=o.length,u=0;u<s;u++)for(var l=n[u],c=0;c<a;c++){var d=o[c];if(d==l||"*"==l){var h=r.node.edges[d],f=r.qNode.edges[l],p=h.final&&f.final,y=void 0;d in r.output.edges?(y=r.output.edges[d]).final=y.final||p:((y=new T.TokenSet).final=p,r.output.edges[d]=y),i.push({qNode:f,output:y,node:h})}}}return t},T.TokenSet.Builder=function(){this.previousWord="",this.root=new T.TokenSet,this.uncheckedNodes=[],this.minimizedNodes={}},T.TokenSet.Builder.prototype.insert=function(e){var t,r=0;if(e<this.previousWord)throw new Error("Out of order word insertion");for(var i=0;i<e.length&&i<this.previousWord.length&&e[i]==this.previousWord[i];i++)r++;this.minimize(r),t=0==this.uncheckedNodes.length?this.root:this.uncheckedNodes[this.uncheckedNodes.length-1].child;for(i=r;i<e.length;i++){var n=new T.TokenSet,s=e[i];t.edges[s]=n,this.uncheckedNodes.push({parent:t,char:s,child:n}),t=n}t.final=!0,this.previousWord=e},T.TokenSet.Builder.prototype.finish=function(){this.minimize(0)},T.TokenSet.Builder.prototype.minimize=function(e){for(var t=this.uncheckedNodes.length-1;t>=e;t--){var r=this.uncheckedNodes[t],i=r.child.toString();i in this.minimizedNodes?r.parent.edges[r.char]=this.minimizedNodes[i]:(r.child._str=i,this.minimizedNodes[i]=r.child),this.uncheckedNodes.pop()}},T.Index=function(e){this.invertedIndex=e.invertedIndex,this.fieldVectors=e.fieldVectors,this.tokenSet=e.tokenSet,this.fields=e.fields,this.pipeline=e.pipeline},T.Index.prototype.search=function(e){return this.query(function(t){new T.QueryParser(e,t).parse()})},T.Index.prototype.query=function(e){for(var t=new T.Query(this.fields),r=Object.create(null),i=Object.create(null),n=Object.create(null),s=Object.create(null),o=Object.create(null),a=0;a<this.fields.length;a++)i[this.fields[a]]=new T.Vector;e.call(t,t);for(a=0;a<t.clauses.length;a++){var u=t.clauses[a],l=null,c=T.Set.complete;l=u.usePipeline?this.pipeline.runString(u.term,{fields:u.fields}):[u.term];for(var d=0;d<l.length;d++){var h=l[d];u.term=h;var f=T.TokenSet.fromClause(u),p=this.tokenSet.intersect(f).toArray();if(0===p.length&&u.presence===T.Query.presence.REQUIRED){for(var y=0;y<u.fields.length;y++){s[F=u.fields[y]]=T.Set.empty}break}for(var m=0;m<p.length;m++){var g=p[m],x=this.invertedIndex[g],v=x._index;for(y=0;y<u.fields.length;y++){var w=x[F=u.fields[y]],Q=Object.keys(w),k=g+"/"+F,S=new T.Set(Q);if(u.presence==T.Query.presence.REQUIRED&&(c=c.union(S),void 0===s[F]&&(s[F]=T.Set.complete)),u.presence!=T.Query.presence.PROHIBITED){if(i[F].upsert(v,u.boost,function(e,t){return e+t}),!n[k]){for(var E=0;E<Q.length;E++){var L,b=Q[E],P=new T.FieldRef(b,F),O=w[b];void 0===(L=r[P])?r[P]=new T.MatchData(g,F,O):L.add(g,F,O)}n[k]=!0}}else void 0===o[F]&&(o[F]=T.Set.empty),o[F]=o[F].union(S)}}}if(u.presence===T.Query.presence.REQUIRED)for(y=0;y<u.fields.length;y++){s[F=u.fields[y]]=s[F].intersect(c)}}var I=T.Set.complete,R=T.Set.empty;for(a=0;a<this.fields.length;a++){var F;s[F=this.fields[a]]&&(I=I.intersect(s[F])),o[F]&&(R=R.union(o[F]))}var C=Object.keys(r),N=[],j=Object.create(null);if(t.isNegated()){C=Object.keys(this.fieldVectors);for(a=0;a<C.length;a++){P=C[a];var _=T.FieldRef.fromString(P);r[P]=new T.MatchData}}for(a=0;a<C.length;a++){var D=(_=T.FieldRef.fromString(C[a])).docRef;if(I.contains(D)&&!R.contains(D)){var A,B=this.fieldVectors[_],V=i[_.fieldName].similarity(B);if(void 0!==(A=j[D]))A.score+=V,A.matchData.combine(r[_]);else{var z={ref:D,score:V,matchData:r[_]};j[D]=z,N.push(z)}}}return N.sort(function(e,t){return t.score-e.score})},T.Index.prototype.toJSON=function(){var e=Object.keys(this.invertedIndex).sort().map(function(e){return[e,this.invertedIndex[e]]},this),t=Object.keys(this.fieldVectors).map(function(e){return[e,this.fieldVectors[e].toJSON()]},this);return{version:T.version,fields:this.fields,fieldVectors:t,invertedIndex:e,pipeline:this.pipeline.toJSON()}},T.Index.load=function(e){var t={},r={},i=e.fieldVectors,n=Object.create(null),s=e.invertedIndex,o=new T.TokenSet.Builder,a=T.Pipeline.load(e.pipeline);e.version!=T.version&&T.utils.warn("Version mismatch when loading serialised index. Current version of lunr '"+T.version+"' does not match serialized index '"+e.version+"'");for(var u=0;u<i.length;u++){var l=(d=i[u])[0],c=d[1];r[l]=new T.Vector(c)}for(u=0;u<s.length;u++){var d,h=(d=s[u])[0],f=d[1];o.insert(h),n[h]=f}return o.finish(),t.fields=e.fields,t.fieldVectors=r,t.invertedIndex=n,t.tokenSet=o.root,t.pipeline=a,new T.Index(t)},T.Builder=function(){this._ref="id",this._fields=Object.create(null),this._documents=Object.create(null),this.invertedIndex=Object.create(null),this.fieldTermFrequencies={},this.fieldLengths={},this.tokenizer=T.tokenizer,this.pipeline=new T.Pipeline,this.searchPipeline=new T.Pipeline,this.documentCount=0,this._b=.75,this._k1=1.2,this.termIndex=0,this.metadataWhitelist=[]},T.Builder.prototype.ref=function(e){this._ref=e},T.Builder.prototype.field=function(e,t){if(/\//.test(e))throw new RangeError("Field '"+e+"' contains illegal character '/'");this._fields[e]=t||{}},T.Builder.prototype.b=function(e){this._b=e<0?0:e>1?1:e},T.Builder.prototype.k1=function(e){this._k1=e},T.Builder.prototype.add=function(e,t){var r=e[this._ref],i=Object.keys(this._fields);this._documents[r]=t||{},this.documentCount+=1;for(var n=0;n<i.length;n++){var s=i[n],o=this._fields[s].extractor,a=o?o(e):e[s],u=this.tokenizer(a,{fields:[s]}),l=this.pipeline.run(u),c=new T.FieldRef(r,s),d=Object.create(null);this.fieldTermFrequencies[c]=d,this.fieldLengths[c]=0,this.fieldLengths[c]+=l.length;for(var h=0;h<l.length;h++){var f=l[h];if(void 0==d[f]&&(d[f]=0),d[f]+=1,void 0==this.invertedIndex[f]){var p=Object.create(null);p._index=this.termIndex,this.termIndex+=1;for(var y=0;y<i.length;y++)p[i[y]]=Object.create(null);this.invertedIndex[f]=p}void 0==this.invertedIndex[f][s][r]&&(this.invertedIndex[f][s][r]=Object.create(null));for(var m=0;m<this.metadataWhitelist.length;m++){var g=this.metadataWhitelist[m],x=f.metadata[g];void 0==this.invertedIndex[f][s][r][g]&&(this.invertedIndex[f][s][r][g]=[]),this.invertedIndex[f][s][r][g].push(x)}}}},T.Builder.prototype.calculateAverageFieldLengths=function(){for(var e=Object.keys(this.fieldLengths),t=e.length,r={},i={},n=0;n<t;n++){var s=T.FieldRef.fromString(e[n]),o=s.fieldName;i[o]||(i[o]=0),i[o]+=1,r[o]||(r[o]=0),r[o]+=this.fieldLengths[s]}var a=Object.keys(this._fields);for(n=0;n<a.length;n++){var u=a[n];r[u]=r[u]/i[u]}this.averageFieldLength=r},T.Builder.prototype.createFieldVectors=function(){for(var e={},t=Object.keys(this.fieldTermFrequencies),r=t.length,i=Object.create(null),n=0;n<r;n++){for(var s=T.FieldRef.fromString(t[n]),o=s.fieldName,a=this.fieldLengths[s],u=new T.Vector,l=this.fieldTermFrequencies[s],c=Object.keys(l),d=c.length,h=this._fields[o].boost||1,f=this._documents[s.docRef].boost||1,p=0;p<d;p++){var y,m,g,x=c[p],v=l[x],w=this.invertedIndex[x]._index;void 0===i[x]?(y=T.idf(this.invertedIndex[x],this.documentCount),i[x]=y):y=i[x],m=y*((this._k1+1)*v)/(this._k1*(1-this._b+this._b*(a/this.averageFieldLength[o]))+v),m*=h,m*=f,g=Math.round(1e3*m)/1e3,u.insert(w,g)}e[s]=u}this.fieldVectors=e},T.Builder.prototype.createTokenSet=function(){this.tokenSet=T.TokenSet.fromArray(Object.keys(this.invertedIndex).sort())},T.Builder.prototype.build=function(){return this.calculateAverageFieldLengths(),this.createFieldVectors(),this.createTokenSet(),new T.Index({invertedIndex:this.invertedIndex,fieldVectors:this.fieldVectors,tokenSet:this.tokenSet,fields:Object.keys(this._fields),pipeline:this.searchPipeline})},T.Builder.prototype.use=function(e){var t=Array.prototype.slice.call(arguments,1);t.unshift(this),e.apply(this,t)},T.MatchData=function(e,t,r){for(var i=Object.create(null),n=Object.keys(r||{}),s=0;s<n.length;s++){var o=n[s];i[o]=r[o].slice()}this.metadata=Object.create(null),void 0!==e&&(this.metadata[e]=Object.create(null),this.metadata[e][t]=i)},T.MatchData.prototype.combine=function(e){for(var t=Object.keys(e.metadata),r=0;r<t.length;r++){var i=t[r],n=Object.keys(e.metadata[i]);void 0==this.metadata[i]&&(this.metadata[i]=Object.create(null));for(var s=0;s<n.length;s++){var o=n[s],a=Object.keys(e.metadata[i][o]);void 0==this.metadata[i][o]&&(this.metadata[i][o]=Object.create(null));for(var u=0;u<a.length;u++){var l=a[u];void 0==this.metadata[i][o][l]?this.metadata[i][o][l]=e.metadata[i][o][l]:this.metadata[i][o][l]=this.metadata[i][o][l].concat(e.metadata[i][o][l])}}}},T.MatchData.prototype.add=function(e,t,r){if(!(e in this.metadata))return this.metadata[e]=Object.create(null),void(this.metadata[e][t]=r);if(t in this.metadata[e])for(var i=Object.keys(r),n=0;n<i.length;n++){var s=i[n];s in this.metadata[e][t]?this.metadata[e][t][s]=this.metadata[e][t][s].concat(r[s]):this.metadata[e][t][s]=r[s]}else this.metadata[e][t]=r},T.Query=function(e){this.clauses=[],this.allFields=e},T.Query.wildcard=new String("*"),T.Query.wildcard.NONE=0,T.Query.wildcard.LEADING=1,T.Query.wildcard.TRAILING=2,T.Query.presence={OPTIONAL:1,REQUIRED:2,PROHIBITED:3},T.Query.prototype.clause=function(e){return"fields"in e||(e.fields=this.allFields),"boost"in e||(e.boost=1),"usePipeline"in e||(e.usePipeline=!0),"wildcard"in e||(e.wildcard=T.Query.wildcard.NONE),e.wildcard&T.Query.wildcard.LEADING&&e.term.charAt(0)!=T.Query.wildcard&&(e.term="*"+e.term),e.wildcard&T.Query.wildcard.TRAILING&&e.term.slice(-1)!=T.Query.wildcard&&(e.term=e.term+"*"),"presence"in e||(e.presence=T.Query.presence.OPTIONAL),this.clauses.push(e),this},T.Query.prototype.isNegated=function(){for(var e=0;e<this.clauses.length;e++)if(this.clauses[e].presence!=T.Query.presence.PROHIBITED)return!1;return!0},T.Query.prototype.term=function(e,t){if(Array.isArray(e))return e.forEach(function(e){this.term(e,T.utils.clone(t))},this),this;var r=t||{};return r.term=e.toString(),this.clause(r),this},T.QueryParseError=function(e,t,r){this.name="QueryParseError",this.message=e,this.start=t,this.end=r},T.QueryParseError.prototype=new Error,T.QueryLexer=function(e){this.lexemes=[],this.str=e,this.length=e.length,this.pos=0,this.start=0,this.escapeCharPositions=[]},T.QueryLexer.prototype.run=function(){for(var e=T.QueryLexer.lexText;e;)e=e(this)},T.QueryLexer.prototype.sliceString=function(){for(var e=[],t=this.start,r=this.pos,i=0;i<this.escapeCharPositions.length;i++)r=this.escapeCharPositions[i],e.push(this.str.slice(t,r)),t=r+1;return e.push(this.str.slice(t,this.pos)),this.escapeCharPositions.length=0,e.join("")},T.QueryLexer.prototype.emit=function(e){this.lexemes.push({type:e,str:this.sliceString(),start:this.start,end:this.pos}),this.start=this.pos},T.QueryLexer.prototype.escapeCharacter=function(){this.escapeCharPositions.push(this.pos-1),this.pos+=1},T.QueryLexer.prototype.next=function(){if(this.pos>=this.length)return T.QueryLexer.EOS;var e=this.str.charAt(this.pos);return this.pos+=1,e},T.QueryLexer.prototype.width=function(){return this.pos-this.start},T.QueryLexer.prototype.ignore=function(){this.start==this.pos&&(this.pos+=1),this.start=this.pos},T.QueryLexer.prototype.backup=function(){this.pos-=1},T.QueryLexer.prototype.acceptDigitRun=function(){var e,t;do{t=(e=this.next()).charCodeAt(0)}while(t>47&&t<58);e!=T.QueryLexer.EOS&&this.backup()},T.QueryLexer.prototype.more=function(){return this.pos<this.length},T.QueryLexer.EOS="EOS",T.QueryLexer.FIELD="FIELD",T.QueryLexer.TERM="TERM",T.QueryLexer.EDIT_DISTANCE="EDIT_DISTANCE",T.QueryLexer.BOOST="BOOST",T.QueryLexer.PRESENCE="PRESENCE",T.QueryLexer.lexField=function(e){return e.backup(),e.emit(T.QueryLexer.FIELD),e.ignore(),T.QueryLexer.lexText},T.QueryLexer.lexTerm=function(e){if(e.width()>1&&(e.backup(),e.emit(T.QueryLexer.TERM)),e.ignore(),e.more())return T.QueryLexer.lexText},T.QueryLexer.lexEditDistance=function(e){return e.ignore(),e.acceptDigitRun(),e.emit(T.QueryLexer.EDIT_DISTANCE),T.QueryLexer.lexText},T.QueryLexer.lexBoost=function(e){return e.ignore(),e.acceptDigitRun(),e.emit(T.QueryLexer.BOOST),T.QueryLexer.lexText},T.QueryLexer.lexEOS=function(e){e.width()>0&&e.emit(T.QueryLexer.TERM)},T.QueryLexer.termSeparator=T.tokenizer.separator,T.QueryLexer.lexText=function(e){for(;;){var t=e.next();if(t==T.QueryLexer.EOS)return T.QueryLexer.lexEOS;if(92!=t.charCodeAt(0)){if(":"==t)return T.QueryLexer.lexField;if("~"==t)return e.backup(),e.width()>0&&e.emit(T.QueryLexer.TERM),T.QueryLexer.lexEditDistance;if("^"==t)return e.backup(),e.width()>0&&e.emit(T.QueryLexer.TERM),T.QueryLexer.lexBoost;if("+"==t&&1===e.width())return e.emit(T.QueryLexer.PRESENCE),T.QueryLexer.lexText;if("-"==t&&1===e.width())return e.emit(T.QueryLexer.PRESENCE),T.QueryLexer.lexText;if(t.match(T.QueryLexer.termSeparator))return T.QueryLexer.lexTerm}else e.escapeCharacter()}},T.QueryParser=function(e,t){this.lexer=new T.QueryLexer(e),this.query=t,this.currentClause={},this.lexemeIdx=0},T.QueryParser.prototype.parse=function(){this.lexer.run(),this.lexemes=this.lexer.lexemes;for(var e=T.QueryParser.parseClause;e;)e=e(this);return this.query},T.QueryParser.prototype.peekLexeme=function(){return this.lexemes[this.lexemeIdx]},T.QueryParser.prototype.consumeLexeme=function(){var e=this.peekLexeme();return this.lexemeIdx+=1,e},T.QueryParser.prototype.nextClause=function(){var e=this.currentClause;this.query.clause(e),this.currentClause={}},T.QueryParser.parseClause=function(e){var t=e.peekLexeme();if(void 0!=t)switch(t.type){case T.QueryLexer.PRESENCE:return T.QueryParser.parsePresence;case T.QueryLexer.FIELD:return T.QueryParser.parseField;case T.QueryLexer.TERM:return T.QueryParser.parseTerm;default:var r="expected either a field or a term, found "+t.type;throw t.str.length>=1&&(r+=" with value '"+t.str+"'"),new T.QueryParseError(r,t.start,t.end)}},T.QueryParser.parsePresence=function(e){var t=e.consumeLexeme();if(void 0!=t){switch(t.str){case"-":e.currentClause.presence=T.Query.presence.PROHIBITED;break;case"+":e.currentClause.presence=T.Query.presence.REQUIRED;break;default:var r="unrecognised presence operator'"+t.str+"'";throw new T.QueryParseError(r,t.start,t.end)}var i=e.peekLexeme();if(void 0==i){r="expecting term or field, found nothing";throw new T.QueryParseError(r,t.start,t.end)}switch(i.type){case T.QueryLexer.FIELD:return T.QueryParser.parseField;case T.QueryLexer.TERM:return T.QueryParser.parseTerm;default:r="expecting term or field, found '"+i.type+"'";throw new T.QueryParseError(r,i.start,i.end)}}},T.QueryParser.parseField=function(e){var t=e.consumeLexeme();if(void 0!=t){if(-1==e.query.allFields.indexOf(t.str)){var r=e.query.allFields.map(function(e){return"'"+e+"'"}).join(", "),i="unrecognised field '"+t.str+"', possible fields: "+r;throw new T.QueryParseError(i,t.start,t.end)}e.currentClause.fields=[t.str];var n=e.peekLexeme();if(void 0==n){i="expecting term, found nothing";throw new T.QueryParseError(i,t.start,t.end)}switch(n.type){case T.QueryLexer.TERM:return T.QueryParser.parseTerm;default:i="expecting term, found '"+n.type+"'";throw new T.QueryParseError(i,n.start,n.end)}}},T.QueryParser.parseTerm=function(e){var t=e.consumeLexeme();if(void 0!=t){e.currentClause.term=t.str.toLowerCase(),-1!=t.str.indexOf("*")&&(e.currentClause.usePipeline=!1);var r=e.peekLexeme();if(void 0!=r)switch(r.type){case T.QueryLexer.TERM:return e.nextClause(),T.QueryParser.parseTerm;case T.QueryLexer.FIELD:return e.nextClause(),T.QueryParser.parseField;case T.QueryLexer.EDIT_DISTANCE:return T.QueryParser.parseEditDistance;case T.QueryLexer.BOOST:return T.QueryParser.parseBoost;case T.QueryLexer.PRESENCE:return e.nextClause(),T.QueryParser.parsePresence;default:var i="Unexpected lexeme type '"+r.type+"'";throw new T.QueryParseError(i,r.start,r.end)}else e.nextClause()}},T.QueryParser.parseEditDistance=function(e){var t=e.consumeLexeme();if(void 0!=t){var r=parseInt(t.str,10);if(isNaN(r)){var i="edit distance must be numeric";throw new T.QueryParseError(i,t.start,t.end)}e.currentClause.editDistance=r;var n=e.peekLexeme();if(void 0!=n)switch(n.type){case T.QueryLexer.TERM:return e.nextClause(),T.QueryParser.parseTerm;case T.QueryLexer.FIELD:return e.nextClause(),T.QueryParser.parseField;case T.QueryLexer.EDIT_DISTANCE:return T.QueryParser.parseEditDistance;case T.QueryLexer.BOOST:return T.QueryParser.parseBoost;case T.QueryLexer.PRESENCE:return e.nextClause(),T.QueryParser.parsePresence;default:i="Unexpected lexeme type '"+n.type+"'";throw new T.QueryParseError(i,n.start,n.end)}else e.nextClause()}},T.QueryParser.parseBoost=function(e){var t=e.consumeLexeme();if(void 0!=t){var r=parseInt(t.str,10);if(isNaN(r)){var i="boost must be numeric";throw new T.QueryParseError(i,t.start,t.end)}e.currentClause.boost=r;var n=e.peekLexeme();if(void 0!=n)switch(n.type){case T.QueryLexer.TERM:return e.nextClause(),T.QueryParser.parseTerm;case T.QueryLexer.FIELD:return e.nextClause(),T.QueryParser.parseField;case T.QueryLexer.EDIT_DISTANCE:return T.QueryParser.parseEditDistance;case T.QueryLexer.BOOST:return T.QueryParser.parseBoost;case T.QueryLexer.PRESENCE:return e.nextClause(),T.QueryParser.parsePresence;default:i="Unexpected lexeme type '"+n.type+"'";throw new T.QueryParseError(i,n.start,n.end)}else e.nextClause()}},b=this,P=function(){return T},"function"==typeof define&&define.amd?define(P):"object"==typeof exports?module.exports=P():b.lunr=P()}();

/**
 * END LUNR CODE
 */

const lunrIndex = lunr(function() {
  this.ref("index");
  this.field("transcripts", {"boost": 3});
  this.field("title");
  this.field("caption");
  
  this.metadataWhitelist = ['position']
  
  for(i = 0; i < documents.length; i++) {
    documents[i]["index"] = i;
    this.add(documents[i]);
  }
});

const SNIPPET_MAX_CHARS = 150;

let currentResults;
let displayedResults = 0;
let observer = null;
let observed = null;

if ("IntersectionObserver" in window) {
  observer = new IntersectionObserver(function(entries) {
    if (entries[0].isIntersecting) {
      observer.disconnect();
      showNextBatch();
    }
  }, {});
} else {
  // Fallback for Safari. TODO: Delete
  document.addEventListener("scroll", searchScrollHandler);
  window.addEventListener("resize", searchScrollHandler);
}

// For Safari. TODO: Delete
function searchScrollHandler() {
  if (observed != null && getScrollPosition() > observed.offsetTop - document.body.offsetHeight) {
    showNextBatch();
  }
}

window.addEventListener("popstate", function(evt) {
  searchInputElement.value = evt.state;
  search(false);
});
  
search(false);

function search(nav) {
  clearContents("#search-results");
  
  const queryString = searchInputElement.value;
  if (queryString.trim() == "") {
    document.querySelector('#search-didnt-find').style.display = 'none';
    document.querySelector('#search-no-query').style.display = 'block';
    document.title = "Search | What's My Pro-Life Line?";
  } else {
    document.querySelector('#search-no-query').style.display = 'none';
    document.title = queryString + " | Search | What's My Pro-Life Line?";
    currentResults = lunrIndex.search(queryString);
    displayedResults = 0;
    
    if (currentResults.length >= 1) {
      document.querySelector('#search-no-results-title').style.display = 'none';
      document.querySelector('#search-end-of-results-title').style.display = 'block';
      
      // Fill in new search results
      showNextBatch(null, null);
    } else {
      // No search results
      document.querySelector('#search-no-results-title').style.display = 'block';
      document.querySelector('#search-end-of-results-title').style.display = 'none';
      
      const noResultsQ = clearContents('#no-results-q');
      noResultsQ.appendChild(document.createTextNode(queryString));
    }
    
    document.querySelector('#search-didnt-find').style.display = 'block';
  }
  
  const q = encodeURIComponent(queryString).replace("%20", "+");
  if (nav) {
    // Add new state to history
    window.history.pushState(queryString, queryString, "/search/?q=" + q);
    // Record the search in Google Analytics
    gtag('config', 'UA-131348243-1', {'page_path': "/search/?q=" + q});
  } else {
    // Tag history state with query string for back/forward navigation
    window.history.replaceState(queryString, queryString, "/search/?q=" + q);
  }
  
  // Take focus away to dismiss keyboard on mobile
  document.querySelector("#search-input").blur();
}

function showNextBatch() {
  const resultsDiv = document.querySelector("#search-results");
  const newDisplayedResults = Math.min(currentResults.length, displayedResults + 10);
  
  observed = null;
  
  for (let i = displayedResults; i < newDisplayedResults; i++) {
    const type = documents[currentResults[i]["ref"]]["type"];
    const slug = documents[currentResults[i]["ref"]]["slug"];
    const title = documents[currentResults[i]["ref"]]["title"];
    
    const resultElement = document.createElement("a");
    resultElement.classList.add("search-result");
    resultElement.classList.add("grow");
    resultElement.addEventListener("touchstart", function() {
      a(this);
    });
    resultElement.addEventListener("touchend", function() {
      b(this);
    });
    resultElement.href = "/" + type + "s/" + slug;
    
    const thumbnailContainer = document.createElement("div");
    thumbnailContainer.classList.add("thumbnail-link");
    thumbnailContainer.style.gridArea = "image";
    thumbnailContainer.style.margin = "auto";
    
    const pic = document.createElement("picture");
    pic.classList.add("thumbnail");
    pic.classList.add("post-ratio");
    
    if (type == "post") {
      pic.title = title;
      
      fetch("/posts/" + slug + "/thumbnail.html")
        .then(function(response) {
          return response.text();
        })
        .then(function(text) {
          pic.innerHTML = text;
        });
      
    } else {
      pic.title = "Tag: " + title;
      
      const img = document.createElement("img");
      img.src = "/assets/tag.svg";
      pic.appendChild(img);
    }
    
    thumbnailContainer.appendChild(pic);
    resultElement.appendChild(thumbnailContainer);
    
    const titleElement = document.createElement("h1");
    titleElement.innerHTML = title;
    resultElement.appendChild(titleElement);
    
    const captionDiv = document.createElement("p");
    captionDiv.innerHTML = snippet(currentResults[i]);
    captionDiv.classList.add("search-result-caption-snippet");
    resultElement.appendChild(captionDiv);
    
    const section = document.createElement("section");
    section.appendChild(resultElement);
    section.appendChild(document.createElement("hr"));
    resultsDiv.appendChild(section);
    
    if (i == newDisplayedResults - 1 && newDisplayedResults < currentResults.length) {
      if (observer != null) {
        observer.observe(section);
      } else {
        observed = section;
      }
    }
  }
  
  displayedResults = newDisplayedResults;
  if (observer == null) searchScrollHandler();
}

// Compute the actual snippet start and length, avoiding breaking words
function segment(caption, reverseCaption, idealStart) {
  // start is the start of the first word at position >= idealStart
  let start = 0;
  if (idealStart > 0) start = caption.indexOf(" ", idealStart - 1) + 1;
  
  // end is the end of the last word so that the length of the snippet is at most SNIPPET_MAX_CHARS
  const idealEnd = start + SNIPPET_MAX_CHARS;
  let end = caption.length;
  if (idealEnd < end) {
    const backwardIdealEnd = caption.length - 1 - idealEnd;
    const backwardEnd = reverseCaption.indexOf(" ", backwardIdealEnd - 1) + 1;
    end = caption.length - backwardEnd;
  }
  
  return [start, end];
}

function snippet(result) {
  p = [];
  
  // TODO: Refactor
  field = documents[result["ref"]].type == "post" ? "caption" : "transcripts"
  
  for (term in result.matchData.metadata) {
    if (field in result.matchData.metadata[term]) {
      p = p.concat(result.matchData.metadata[term][field].position);
    }
  }
  
  // Sort by start position
  p.sort(function(a, b) { return a[0] - b[0] });
  
  const caption = documents[result["ref"]][field];
  const reverseCaption = caption.split("").reverse().join("");
  
  let o = segment(caption, reverseCaption, 0);
  let bestMatches = 0;
  let bestFirstMatchIndex = 0;
  let bestStart = o[0];
  let bestEnd = o[1];
  let bestPenalty = Infinity;
  
  for (let i = 0; i < p.length; i++) {
    // Consider the best possible snippet with p[i] as the first match in the snippet
    let COM = 0;
    
    // First, determine number of matches in snippet
    let j = i - 1;
    while (j + 1 < p.length && p[j + 1][0] + p[j + 1][1] < p[i][0] + SNIPPET_MAX_CHARS) {
      // Include match j in snippet
      j++;
      COM += p[j][0] + p[j][1] / 2;
    }
    
    const numMatches = j - i + 1;
    if(numMatches >= bestMatches) {
      // A candidate! Now, determine the penalty, i.e., distance from center of mass to center of snippet
      // Compute center of mass of matches.
      COM /= numMatches;
      
      // It would be nice to be centered at COM
      let idealStart = COM - SNIPPET_MAX_CHARS / 2;
      
      // Include all the matches
      idealStart = Math.min(idealStart, p[i][0]);
      idealStart = Math.max(idealStart, p[j][0] + p[j][1] - SNIPPET_MAX_CHARS);
      
      // Don't cut off the snippet unnecessarily early
      idealStart = Math.min(idealStart, caption.length - SNIPPET_MAX_CHARS);
      
      // Don't break up words
      o = segment(caption, reverseCaption, idealStart);
      const start = o[0];
      const end = o[1];
      
      // Now compute the penalty
      const penalty = Math.abs(COM - (start + end)/2);
      
      if (penalty < bestPenalty) {
        // A new record!
        bestMatches = numMatches;
        bestFirstMatchIndex = i;
        bestStart = start;
        bestEnd = end;
        bestPenalty = penalty;
      }
    }
  }
  
  // Add marking and ellipses
  let ret = "";
  if (bestStart > 0) {
    ret += "…";
  }
  
  let position = bestStart;
  for (let i = bestFirstMatchIndex; i < bestFirstMatchIndex + bestMatches; i++) {
    ret += caption.substring(position, p[i][0]);
    ret += "<mark>" + caption.substr(p[i][0], p[i][1]) + "</mark>";
    position = p[i][0] + p[i][1];
  }
  
  ret += caption.substring(position, bestEnd);
  if (bestEnd < caption.length) {
    ret += "…";
  }
  
  return ret;
}