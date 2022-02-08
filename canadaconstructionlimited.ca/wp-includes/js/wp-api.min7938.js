!function(e){"use strict";e.wp=e.wp||{},wp.api=wp.api||new function(){this.models={},this.collections={},this.views={}},wp.api.versionString=wp.api.versionString||"wp/v2/",!_.isFunction(_.includes)&&_.isFunction(_.contains)&&(_.includes=_.contains)}(window),function(e){"use strict";var t,i;e.wp=e.wp||{},wp.api=wp.api||{},wp.api.utils=wp.api.utils||{},wp.api.getModelByRoute=function(t){return _.find(wp.api.models,function(e){return e.prototype.route&&t===e.prototype.route.index})},wp.api.getCollectionByRoute=function(t){return _.find(wp.api.collections,function(e){return e.prototype.route&&t===e.prototype.route.index})},Date.prototype.toISOString||(t=function(e){return i=1===(i=String(e)).length?"0"+i:i},Date.prototype.toISOString=function(){return this.getUTCFullYear()+"-"+t(this.getUTCMonth()+1)+"-"+t(this.getUTCDate())+"T"+t(this.getUTCHours())+":"+t(this.getUTCMinutes())+":"+t(this.getUTCSeconds())+"."+String((this.getUTCMilliseconds()/1e3).toFixed(3)).slice(2,5)+"Z"}),wp.api.utils.parseISO8601=function(e){var t,i,n,o,s=0,a=[1,4,5,6,7,10,11];if(i=/^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/.exec(e)){for(n=0;o=a[n];++n)i[o]=+i[o]||0;i[2]=(+i[2]||1)-1,i[3]=+i[3]||1,"Z"!==i[8]&&void 0!==i[9]&&(s=60*i[10]+i[11],"+"===i[9]&&(s=0-s)),t=Date.UTC(i[1],i[2],i[3],i[4],i[5]+s,i[6],i[7])}else t=Date.parse?Date.parse(e):NaN;return t},wp.api.utils.getRootUrl=function(){return e.location.origin?e.location.origin+"/":e.location.protocol+"/"+e.location.host+"/"},wp.api.utils.capitalize=function(e){return _.isUndefined(e)?e:e.charAt(0).toUpperCase()+e.slice(1)},wp.api.utils.capitalizeAndCamelCaseDashes=function(e){return _.isUndefined(e)?e:(e=wp.api.utils.capitalize(e),wp.api.utils.camelCaseDashes(e))},wp.api.utils.camelCaseDashes=function(e){return e.replace(/-([a-z])/g,function(e){return e[1].toUpperCase()})},wp.api.utils.extractRoutePart=function(e,t,i,n){return t=t||1,i=i||wp.api.versionString,e=(e=0===e.indexOf("/"+i)?e.substr(i.length+1):e).split("/"),n&&(e=e.reverse()),_.isUndefined(e[--t])?"":e[t]},wp.api.utils.extractParentName=function(e){var t=e.lastIndexOf("_id>[\\d]+)/");return t<0?"":((t=(t=e.substr(0,t-1)).split("/")).pop(),t=t.pop())},wp.api.utils.decorateFromRoute=function(e,t){_.each(e,function(e){_.includes(e.methods,"POST")||_.includes(e.methods,"PUT")?_.isEmpty(e.args)||(_.isEmpty(t.prototype.args)?t.prototype.args=e.args:t.prototype.args=_.extend(t.prototype.args,e.args)):_.includes(e.methods,"GET")&&(_.isEmpty(e.args)||(_.isEmpty(t.prototype.options)?t.prototype.options=e.args:t.prototype.options=_.extend(t.prototype.options,e.args)))})},wp.api.utils.addMixinsAndHelpers=function(t,e,i){function n(e,t,i,n,o){var s,a=jQuery.Deferred(),e=e.get("_embedded")||{};return _.isNumber(t)&&0!==t?(s=(s=e[n]?_.findWhere(e[n],{id:t}):s)||{id:t},(s=new wp.api.models[i](s)).get(o)?a.resolve(s):s.fetch({success:function(e){a.resolve(e)},error:function(e,t){a.reject(t)}}),a.promise()):(a.reject(),a)}var o=!1,s=["date","modified","date_gmt","modified_gmt"],a={setDate:function(e,t){t=t||"date";if(_.indexOf(s,t)<0)return!1;this.set(t,e.toISOString())},getDate:function(e){var t=e||"date",e=this.get(t);return!(_.indexOf(s,t)<0||_.isNull(e))&&new Date(wp.api.utils.parseISO8601(e))}},p=function(e,t){_.each(e.models,function(e){e.set("parent_post",t)})},r={getMeta:function(e){return this.get("meta")[e]},getMetas:function(){return this.get("meta")},setMetas:function(e){var t=this.get("meta");_.extend(t,e),this.set("meta",t)},setMeta:function(e,t){var i=this.get("meta");i[e]=t,this.set("meta",i)}},c={getRevisions:function(){return e=this,t="PostRevisions",s=o="",a=jQuery.Deferred(),r=e.get("id"),e=e.get("_embedded")||{},_.isNumber(r)&&0!==r?(_.isUndefined(i)||_.isUndefined(e[i])?o={parent:r}:s=_.isUndefined(n)?e[i]:e[i][n],o=new wp.api.collections[t](s,o),_.isUndefined(o.models[0])?o.fetch({success:function(e){p(e,r),a.resolve(e)},error:function(e,t){a.reject(t)}}):(p(o,r),a.resolve(o)),a.promise()):(a.reject(),a);var e,t,i,n,o,s,a,r}},d={getTags:function(){var e=this.get("tags"),t=new wp.api.collections.Tags;return _.isEmpty(e)?jQuery.Deferred().resolve([]):t.fetch({data:{include:e}})},setTags:function(e){var i,n=this,o=[];if(_.isString(e))return!1;_.isArray(e)?(new wp.api.collections.Tags).fetch({data:{per_page:100},success:function(t){_.each(e,function(e){(i=new wp.api.models.Tag(t.findWhere({slug:e}))).set("parent_post",n.get("id")),o.push(i)}),e=new wp.api.collections.Tags(o),n.setTagsWithCollection(e)}}):this.setTagsWithCollection(e)},setTagsWithCollection:function(e){return this.set("tags",e.pluck("id")),this.save()}},l={getCategories:function(){var e=this.get("categories"),t=new wp.api.collections.Categories;return _.isEmpty(e)?jQuery.Deferred().resolve([]):t.fetch({data:{include:e}})},setCategories:function(e){var i,n=this,o=[];if(_.isString(e))return!1;_.isArray(e)?(new wp.api.collections.Categories).fetch({data:{per_page:100},success:function(t){_.each(e,function(e){(i=new wp.api.models.Category(t.findWhere({slug:e}))).set("parent_post",n.get("id")),o.push(i)}),e=new wp.api.collections.Categories(o),n.setCategoriesWithCollection(e)}}):this.setCategoriesWithCollection(e)},setCategoriesWithCollection:function(e){return this.set("categories",e.pluck("id")),this.save()}},u={getAuthorUser:function(){return n(this,this.get("author"),"User","author","name")}},g={getFeaturedMedia:function(){return n(this,this.get("featured_media"),"Media","wp:featuredmedia","source_url")}};return _.isUndefined(t.prototype.args)?t:(_.each(s,function(e){_.isUndefined(t.prototype.args[e])||(o=!0)}),o&&(t=t.extend(a)),_.isUndefined(t.prototype.args.author)||(t=t.extend(u)),_.isUndefined(t.prototype.args.featured_media)||(t=t.extend(g)),_.isUndefined(t.prototype.args.categories)||(t=t.extend(l)),_.isUndefined(t.prototype.args.meta)||(t=t.extend(r)),_.isUndefined(t.prototype.args.tags)||(t=t.extend(d)),t=!_.isUndefined(i.collections[e+"Revisions"])?t.extend(c):t)}}(window),function(){"use strict";var i=window.wpApiSettings||{},e=["Comment","Media","Comment","Post","Page","Status","Taxonomy","Type"];wp.api.WPApiBaseModel=Backbone.Model.extend({initialize:function(){-1===_.indexOf(e,this.name)&&(this.requireForceForDelete=!0)},sync:function(e,t,i){var n;return i=i||{},_.isNull(t.get("date_gmt"))&&t.unset("date_gmt"),_.isEmpty(t.get("slug"))&&t.unset("slug"),_.isFunction(t.nonce)&&!_.isEmpty(t.nonce())&&(n=i.beforeSend,i.beforeSend=function(e){if(e.setRequestHeader("X-WP-Nonce",t.nonce()),n)return n.apply(this,arguments)},i.complete=function(e){e=e.getResponseHeader("X-WP-Nonce");e&&_.isFunction(t.nonce)&&t.nonce()!==e&&t.endpointModel.set("nonce",e)}),this.requireForceForDelete&&"delete"===e&&(t.url=t.url()+"?force=true"),Backbone.sync(e,t,i)},save:function(e,t){return!(!_.includes(this.methods,"PUT")&&!_.includes(this.methods,"POST"))&&Backbone.Model.prototype.save.call(this,e,t)},destroy:function(e){return!!_.includes(this.methods,"DELETE")&&Backbone.Model.prototype.destroy.call(this,e)}}),wp.api.models.Schema=wp.api.WPApiBaseModel.extend({defaults:{_links:{},namespace:null,routes:{}},initialize:function(e,t){t=t||{},wp.api.WPApiBaseModel.prototype.initialize.call(this,e,t),this.apiRoot=t.apiRoot||i.root,this.versionString=t.versionString||i.versionString},url:function(){return this.apiRoot+this.versionString}})}(),function(){"use strict";window.wpApiSettings,wp.api.WPApiBaseCollection=Backbone.Collection.extend({initialize:function(e,t){this.state={data:{},currentPage:null,totalPages:null,totalObjects:null},_.isUndefined(t)?this.parent="":this.parent=t.parent},sync:function(e,t,i){var n,o,s=this;return i=i||{},_.isFunction(t.nonce)&&!_.isEmpty(t.nonce())&&(n=i.beforeSend,i.beforeSend=function(e){if(e.setRequestHeader("X-WP-Nonce",t.nonce()),n)return n.apply(s,arguments)},i.complete=function(e){e=e.getResponseHeader("X-WP-Nonce");e&&_.isFunction(t.nonce)&&t.nonce()!==e&&t.endpointModel.set("nonce",e)}),"read"===e&&(i.data?(s.state.data=_.clone(i.data),delete s.state.data.page):s.state.data=i.data={},void 0===i.data.page?(s.state.currentPage=null,s.state.totalPages=null,s.state.totalObjects=null):s.state.currentPage=i.data.page-1,o=i.success,i.success=function(e,t,i){if(_.isUndefined(i)||(s.state.totalPages=parseInt(i.getResponseHeader("x-wp-totalpages"),10),s.state.totalObjects=parseInt(i.getResponseHeader("x-wp-total"),10)),null===s.state.currentPage?s.state.currentPage=1:s.state.currentPage++,o)return o.apply(this,arguments)}),Backbone.sync(e,t,i)},more:function(e){if((e=e||{}).data=e.data||{},_.extend(e.data,this.state.data),void 0===e.data.page){if(!this.hasMore())return!1;null===this.state.currentPage||this.state.currentPage<=1?e.data.page=2:e.data.page=this.state.currentPage+1}return this.fetch(e)},hasMore:function(){return null===this.state.totalPages||null===this.state.totalObjects||null===this.state.currentPage?null:this.state.currentPage<this.state.totalPages}})}(),function(){"use strict";var o,s={},c=window.wpApiSettings||{};window.wp=window.wp||{},wp.api=wp.api||{},_.isEmpty(c)&&(c.root=window.location.origin+"/wp-json/"),o=Backbone.Model.extend({defaults:{apiRoot:c.root,versionString:wp.api.versionString,nonce:null,schema:null,models:{},collections:{}},initialize:function(){var e,t=this;Backbone.Model.prototype.initialize.apply(t,arguments),e=jQuery.Deferred(),t.schemaConstructed=e.promise(),t.schemaModel=new wp.api.models.Schema(null,{apiRoot:t.get("apiRoot"),versionString:t.get("versionString"),nonce:t.get("nonce")}),t.schemaModel.once("change",function(){t.constructFromSchema(),e.resolve(t)}),t.get("schema")?t.schemaModel.set(t.schemaModel.parse(t.get("schema"))):!_.isUndefined(sessionStorage)&&(_.isUndefined(c.cacheSchema)||c.cacheSchema)&&sessionStorage.getItem("wp-api-schema-model"+t.get("apiRoot")+t.get("versionString"))?t.schemaModel.set(t.schemaModel.parse(JSON.parse(sessionStorage.getItem("wp-api-schema-model"+t.get("apiRoot")+t.get("versionString"))))):t.schemaModel.fetch({success:function(e){if(!_.isUndefined(sessionStorage)&&(_.isUndefined(c.cacheSchema)||c.cacheSchema))try{sessionStorage.setItem("wp-api-schema-model"+t.get("apiRoot")+t.get("versionString"),JSON.stringify(e))}catch(e){}},error:function(e){window.console.log(e)}})},constructFromSchema:function(){var s=this,a=c.mapping||{models:{Categories:"Category",Comments:"Comment",Pages:"Page",PagesMeta:"PageMeta",PagesRevisions:"PageRevision",Posts:"Post",PostsCategories:"PostCategory",PostsRevisions:"PostRevision",PostsTags:"PostTag",Schema:"Schema",Statuses:"Status",Tags:"Tag",Taxonomies:"Taxonomy",Types:"Type",Users:"User"},collections:{PagesMeta:"PageMeta",PagesRevisions:"PageRevisions",PostsCategories:"PostCategories",PostsMeta:"PostMeta",PostsRevisions:"PostRevisions",PostsTags:"PostTags"}},e=s.get("modelEndpoints"),i=new RegExp("(?:.*[+)]|/("+e.join("|")+"))$"),n=[],o=[],r=s.get("apiRoot").replace(wp.api.utils.getRootUrl(),""),p={models:{},collections:{}};_.each(s.schemaModel.get("routes"),function(e,t){t!==s.get(" versionString")&&t!==r&&t!=="/"+s.get("versionString").slice(0,-1)&&(i.test(t)?n:o).push({index:t,route:e})}),_.each(n,function(e){var t,i=wp.api.utils.extractRoutePart(e.index,2,s.get("versionString"),!0),n=wp.api.utils.extractRoutePart(e.index,1,s.get("versionString"),!1),o=wp.api.utils.extractRoutePart(e.index,1,s.get("versionString"),!0);n===s.get("versionString")&&(n=""),"me"===o&&(i="me"),""!==n&&n!==i?(t=wp.api.utils.capitalizeAndCamelCaseDashes(n)+wp.api.utils.capitalizeAndCamelCaseDashes(i),t=a.models[t]||t,p.models[t]=wp.api.WPApiBaseModel.extend({url:function(){var e=s.get("apiRoot")+s.get("versionString")+n+"/"+(_.isUndefined(this.get("parent"))||0===this.get("parent")?_.isUndefined(this.get("parent_post"))?"":this.get("parent_post")+"/":this.get("parent")+"/")+i;return _.isUndefined(this.get("id"))||(e+="/"+this.get("id")),e},nonce:function(){return s.get("nonce")},endpointModel:s,route:e,name:t,methods:e.route.methods,endpoints:e.route.endpoints})):(t=wp.api.utils.capitalizeAndCamelCaseDashes(i),t=a.models[t]||t,p.models[t]=wp.api.WPApiBaseModel.extend({url:function(){var e=s.get("apiRoot")+s.get("versionString")+("me"===i?"users/me":i);return _.isUndefined(this.get("id"))||(e+="/"+this.get("id")),e},nonce:function(){return s.get("nonce")},endpointModel:s,route:e,name:t,methods:e.route.methods,endpoints:e.route.endpoints})),wp.api.utils.decorateFromRoute(e.route.endpoints,p.models[t],s.get("versionString"))}),_.each(o,function(e){var t,i,n=e.index.slice(e.index.lastIndexOf("/")+1),o=wp.api.utils.extractRoutePart(e.index,1,s.get("versionString"),!1);""!==o&&o!==n&&s.get("versionString")!==o?(t=wp.api.utils.capitalizeAndCamelCaseDashes(o)+wp.api.utils.capitalizeAndCamelCaseDashes(n),i=a.models[t]||t,t=a.collections[t]||t,p.collections[t]=wp.api.WPApiBaseCollection.extend({url:function(){return s.get("apiRoot")+s.get("versionString")+o+"/"+this.parent+"/"+n},model:function(e,t){return new p.models[i](e,t)},nonce:function(){return s.get("nonce")},endpointModel:s,name:t,route:e,methods:e.route.methods})):(t=wp.api.utils.capitalizeAndCamelCaseDashes(n),i=a.models[t]||t,t=a.collections[t]||t,p.collections[t]=wp.api.WPApiBaseCollection.extend({url:function(){return s.get("apiRoot")+s.get("versionString")+n},model:function(e,t){return new p.models[i](e,t)},nonce:function(){return s.get("nonce")},endpointModel:s,name:t,route:e,methods:e.route.methods})),wp.api.utils.decorateFromRoute(e.route.endpoints,p.collections[t])}),_.each(p.models,function(e,t){p.models[t]=wp.api.utils.addMixinsAndHelpers(e,t,p)}),s.set("models",p.models),s.set("collections",p.collections)}}),wp.api.endpoints=new Backbone.Collection,wp.api.init=function(e){var t,i,n={};return e=e||{},n.nonce=_.isString(e.nonce)?e.nonce:c.nonce||"",n.apiRoot=e.apiRoot||c.root||"/wp-json",n.versionString=e.versionString||c.versionString||"wp/v2/",n.schema=e.schema||null,n.modelEndpoints=e.modelEndpoints||["me","settings"],n.schema||n.apiRoot!==c.root||n.versionString!==c.versionString||(n.schema=c.schema),s[n.apiRoot+n.versionString]||(t=(t=wp.api.endpoints.findWhere({apiRoot:n.apiRoot,versionString:n.versionString}))||new o(n),e=(i=jQuery.Deferred()).promise(),t.schemaConstructed.done(function(e){wp.api.endpoints.add(e),wp.api.models=_.extend(wp.api.models,e.get("models")),wp.api.collections=_.extend(wp.api.collections,e.get("collections")),i.resolve(e)}),s[n.apiRoot+n.versionString]=e),s[n.apiRoot+n.versionString]},wp.api.loadPromise=wp.api.init()}();