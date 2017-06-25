/**
 *
 * @param options
 * @constructor
 */
function CoreUIAlert(options) {
    if ( ! options instanceof Object) {
        throw new Error('Указанные данные не являются объектом');
    }

    if (options.type === undefined) {
        throw new Error('Не удалось распознать тип указанных данных');
    }

    if (options.type !== 'alert') {
        throw new Error('Некорректный тип указанных данных');
    }

    if (options.message === undefined) {
        throw new Error('Отсутствует текст сообщения');
    }

    if (options.view === undefined) {
        options.view = 'warning';
    }

    this._options = options;
}


/**
 *
 * @param element
 */
CoreUIAlert.prototype.render = function(element) {

    var tpl = '<div class="coreui-alert coreui-alert-{{view}}">' +
                  '{{if title}}' +
                      '<h4>{{title}}</h4>' +
                  '{{/if}}' +
                  '{{message}}' +
              '</div>';


    /**
     *
     * @param template
     * @param context
     * @param options
     */
    function templater(template, context, options) {
        var Mark={includes:{},globals:{},delimiter:">",compact:false,_copy:function(d,c){c=c||[];for(var e in d){c[e]=d
        [e]}return c},_size:function(b){return b instanceof Array?b.length:(b||0)},_iter:function(a,b){this.idx=a;this.
        size=b;this.length=b;this.sign="#";this.toString=function(){return this.idx+this.sign.length-1}},_pipe:function
        (h,c){var g,f,b,a;if((g=c.shift())){f=g.split(this.delimiter);b=f.shift().trim();try{a=Mark.pipes[b].apply(null,
        [h].concat(f));h=this._pipe(a,c)}catch(d){}}return h},_eval:function(e,g,h){var a=this._pipe(e,g),b=a,d=-1,c,f;
        if(a instanceof Array){a="";c=b.length;while(++d<c){f={iter:new this._iter(d,c)};a+=h?Mark.up(h,b[d],f):b[d]}}
        else{if(a instanceof Object){a=Mark.up(h,b)}}return a},_test:function(a,e,c,b){var d=Mark.up(e,c,b).split(
        /\{\{\s*else\s*\}\}/);return(a===false?d[1]:d[0])||""},_bridge:function(h,e){e=e==="."?"\\.":e.replace(/\$/g,
        "\\$");var f="{{\\s*"+e+"([^/}]+\\w*)?}}|{{/"+e+"\\s*}}",n=new RegExp(f,"g"),p=h.match(n)||[],o,g,m=0,l=0,k=-1,
        j=0;for(g=0;g<p.length;g++){o=g;k=h.indexOf(p[o],k+1);if(p[o].indexOf("{{/")>-1){l++}else{m++}if(m===l){break}}
        m=h.indexOf(p[0]);l=m+p[0].length;j=k+p[o].length;return[h.substring(m,j),h.substring(l,k)]}};Mark.up=function(
        s,b,e){b=b||{};e=e||{};var m=/\{\{(.+?)\}\}/g,l=s.match(m)||[],t,d,g,h=[],r,c,f,k,o,a,n,q=0,p=0;if(e.pipes){
        this._copy(e.pipes,this.pipes)}if(e.includes){this._copy(e.includes,this.includes)}if(e.globals){this._copy(
        e.globals,this.globals)}if(e.delimiter){this.delimiter=e.delimiter}if(e.compact!==undefined){this.compact=
        e.compact}while((t=l[q++])){k=undefined;f="";r=t.indexOf("/}}")>-1;d=t.substr(2,t.length-(r?5:4));d=d.replace(
        /`(.+?)`/g,function(i,j){return Mark.up("{{"+j+"}}",b)});c=d.trim().indexOf("if ")===0;h=d.split("|");h.shift();
        d=d.replace(/^\s*if/,"").split("|").shift().trim();g=c?"if":d.split("|")[0];n=b[d];if(c&&!h.length){h=
        ["notempty"]}if(!r&&s.indexOf("{{/"+g)>-1){k=this._bridge(s,g);t=k[0];f=k[1];q+=t.match(m).length-1}if(
        /^\{\{\s*else\s*\}\}$/.test(t)){continue}else{if((o=this.globals[d])!==undefined){k=this._eval(o,h,f)}else{if((
        a=this.includes[d])){if(a instanceof Function){a=a()}k=this._pipe(Mark.up(a,b,e),h)}else{if(d.indexOf("#")>-1){
        e.iter.sign=d;k=this._pipe(e.iter,h)}else{if(d==="."){k=this._pipe(b,h)}else{if(d.indexOf(".")>-1){d=d.split
        (".");n=Mark.globals[d[0]];if(n){p=1}else{p=0;n=b}while(n&&p<d.length){n=n[d[p++]]}k=this._eval(n,h,f)}else{if
        (c){k=this._pipe(n,h)}else{if(n instanceof Array){k=this._eval(n,h,f)}else{if(f){k=n?Mark.up(f,n):undefined}else
        {if(b.hasOwnProperty(d)){k=this._pipe(n,h)}}}}}}}}}}if(k instanceof Array){k=this._eval(k,h,f)}if(c){k=this.
        _test(k,f,b,e)}s=s.replace(t,k===undefined?"":k)}return this.compact?s.replace(/>\s+</g,"><"):s};Mark.pipes=
        {empty:function(a){return !a||(a+"").trim().length===0?a:false},notempty:function(a){return a&&(a+"").trim().
        length?a:false},blank:function(b,a){return !!b||b===0?b:a},more:function(d,c){return Mark._size(d)>c?d:false},
        less:function(d,c){return Mark._size(d)<c?d:false},ormore:function(d,c){return Mark._size(d)>=c?d:false},orless:
        function(d,c){return Mark._size(d)<=c?d:false},between:function(e,d,f){e=Mark._size(e);return e>=d&&e<=f?e:false
        },equals:function(d,c){return d===c?d:false},notequals:function(d,c){return d!==c?d:false},like:function(b,a){
        return new RegExp(a,"i").test(b)?b:false},notlike:function(b,a){return !Mark.pipes.like(b,a)?b:false},upcase:
        function(a){return String(a).toUpperCase()},downcase:function(a){return String(a).toLowerCase()},capcase:
        function(a){return a.replace(/(?:^|\s)\S/g,function(b){return b.toUpperCase()})},chop:function(a,b){return a.
        length>b?a.substr(0,b)+"...":a},tease:function(c,d){var b=c.split(/\s+/);return b.slice(0,d).join(" ")+(b.length
        >d?"...":"")},trim:function(a){return a.trim()},pack:function(a){return a.trim().replace(/\s{2,}/g," ")},round:
        function(a){return Math.round(+a)},clean:function(a){return String(a).replace(/<\/?[^>]+>/gi,"")},size:function
        (a){return a.length},length:function(a){return a.length},reverse:function(a){return[].concat(a).reverse()},join:
        function(a,b){return a.join(b)},limit:function(b,c,a){return b.slice(+a||0,+c+(+a||0))},split:function(b,a){
        return b.split(a||",")},choose:function(b,c,a){return !!b?c:(a||"")},toggle:function(c,b,a,d){return a.split
        (",")[b.match(/\w+/g).indexOf(c+"")]||d},sort:function(a,c){var b=function(e,d){return e[c]>d[c]?1:-1};return[].
        concat(a).sort(c?b:undefined)},fix:function(a,b){return(+a).toFixed(b)},mod:function(a,b){return(+a)%(+b)},
        divisible:function(a,b){return a&&(+a%b)===0?a:false},even:function(a){return a&&(+a&1)===0?a:false},odd:
        function(a){return a&&(+a&1)===1?a:false},number:function(a){return parseFloat(a.replace(/[^\-\d\.]/g,""))},url:
        function(a){return encodeURI(a)},bool:function(a){return !!a},falsy:function(a){return !a},first:function(a){
        return a.idx===0},last:function(a){return a.idx===a.size-1},call:function(b,a){return b[a].apply(b,[].slice.call
        (arguments,2))},set:function(b,a){Mark.globals[a]=b;return""},log:function(a){console.log(a);return a}};if(
        typeof String.prototype.trim!=="function"){String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")
        }}if(typeof module!=="undefined"&&module.exports){module.exports=Mark}else{if(typeof define==="function"&&define
        .amd){define(function(){return Mark})}};

        return Mark.up(template, context, options);
    }


    var clone_options = Object.assign({}, this._options);
    var html = templater(tpl, clone_options);

    if (element === undefined) {
        return html;
    }

    var domElement = {};

    if (typeof element === 'string') {
        domElement = document.getElementById(element);

        if ( ! domElement) {
            return '';
        }
    } else if (element instanceof HTMLElement) {
        domElement = element;
    }

    domElement.innerHTML = html;
};