!function(t){var e={};function s(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(i,r,function(e){return t[e]}.bind(null,r));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=1)}([function(t,e,s){},function(t,e,s){"use strict";s.r(e);s(0);class i{constructor({items:t,renderer:e},s){this._renderedItems=t,this._renderer=e,this._container=document.querySelector(s)}appendItem(t){this._container.append(t)}prependItem(t){this._container.prepend(t)}clear(){this._container.innerHTML=""}setItems(t){this._renderedItems=t}renderItems(){this.clear(),this._renderedItems.forEach(t=>{this._renderer(t)})}}class r{constructor({likes:t,_id:e,name:s,link:i,owner:r},n,{handleCardClick:o,confirmDelete:a,handleAddLike:l,handleRemoveLike:c},_){this._placeName=s,this._imageURL=i,this._likes=t,this._id=e,this._owner=r,this._templateSelector=n,this._handleCardClick=o,this._handleCardDelete=a,this._handleAddLike=l,this._handleRemoveLike=c,this._userId=_||this._owner._id,this._card=this._setCardElement()}_toggleLike(){this._likeButtonElement.classList.toggle("like__button_active")}_isLiked(){this._likes.some(t=>t._id===this._userId)&&this._toggleLike()}_setLikeCount(t){this._likeCount=t,this._likeCountElement.textContent=t}_getCardTemplate(){return document.querySelector(this._templateSelector).content.querySelector(".place").cloneNode(!0)}_removeCardLike(t){this._handleRemoveLike(this._id).then(e=>{t(e)}).catch(t=>{console.log(t)})}_addCardLike(t){this._handleAddLike(this._id).then(e=>{t(e)}).catch(t=>{console.log(t)})}_handleLikeEvent(){const t=({likes:t})=>{this._likes=t,this._setLikeCount(t.length),this._toggleLike()};this._likeButtonElement.classList.contains("like__button_active")?this._removeCardLike(t):this._addCardLike(t)}_setEventListeners(){this._likeButtonElement.addEventListener("click",()=>{this._handleLikeEvent()}),this._trashButtonElement.addEventListener("click",()=>{this._handleCardDelete(this)}),this._card.querySelector(".place__picture").addEventListener("click",()=>{this._handleCardClick(this._imageURL,this._placeName)})}_setCardElement(){this._card=this._getCardTemplate();const t=this._card.querySelector(".place__picture");return t.src=this._imageURL,t.alt="Picture of "+this._placeName,this._card.querySelector(".place__name").textContent=this._placeName,this._likeCountElement=this._card.querySelector(".like__count"),this._likeButtonElement=this._card.querySelector(".like__button"),this._trashButtonElement=this._card.querySelector(".trash-button"),this._setLikeCount(this._likes.length),this._likeCount>0&&this._isLiked(),this._owner._id!==this._userId&&this._trashButtonElement.classList.add("hide"),this._setEventListeners(),this._card}getCardElement(){return this._card}getId(){return this._id}remove(){this._card.remove(),this._card=null}}const n=document.querySelector(".content"),o=document.getElementById("edit-profile-button"),a=n.querySelector(".profile__avatar-container"),l=n.querySelector(".add-button");class c{constructor(t){this._selector=t,this._popup=document.querySelector(t),this._form=this._popup.querySelector(".form"),this._overlayElement=this._popup.querySelector(".overlay"),this._closeButton=this._popup.querySelector(".form__close-button"),this._closeButton.addEventListener("click",()=>this.close()),this._saveButton=this._popup.querySelector(".form__save-button"),this._saveButton&&(this._saveButtonOrigTxt=this._saveButton.textContent),this._escapeHandler=t=>{"Escape"===t.key&&this.close()}}open(){document.addEventListener("keyup",this._escapeHandler),this._popup.classList.toggle("hide")}close(){document.removeEventListener("keyup",this._escapeHandler),this._popup.classList.toggle("hide")}}class _ extends c{constructor({promise:t,callback:e},{popupSelector:s,saveButtonEnabledFlag:i=!1}){super(s),this._handleFormSubmit=t,this._callback=e,this._saveButtonEnabledFlag=i,this._inputList=this._form.querySelectorAll(".form__input"),this._form.addEventListener("submit",t=>{t.preventDefault(),this._saveButton.textContent="Saving...",this._handleFormSubmit(this._getInputValues()).then(t=>this._callback(t)).catch(t=>console.log(t)).finally(()=>this.close())})}_getInputValues(){const t={};return this._inputList.forEach(e=>{t[e.name]=e.value}),t}_enableSaveButton(){this._saveButton.classList.remove("form__save-button_disabled"),this._saveButton.disabled=!1}open(){this._saveButtonEnabledFlag&&this._enableSaveButton(),super.open()}close(){this._form.reset(),this._saveButton.textContent=this._saveButtonOrigTxt,this._saveButton.classList.add("form__save-button_disabled"),this._saveButton.disabled=!0,super.close()}setCallbacks({promise:t,callback:e}){this._handleFormSubmit=t,this._callback=e}setInputValues(t){const e=new Map(Object.entries(t));this._inputList.forEach(t=>{t.value=e.get(t.name)})}}class h{constructor({submitButtonSelector:t,inputSelector:e,inputErrorClass:s,errorClass:i,inactiveButtonClass:r},n){this._formElement=n,this._submitButtonElement=this._formElement.querySelector(t),this._inputSelector=e,this._inputErrorClass=s,this._errorClass=i,this._inactiveButtonClass=r}_hasInvalidInput(t){return t.some(t=>!t.validity.valid)}_toggleSubmitButtonState(t){this._hasInvalidInput(t)?(this._submitButtonElement.classList.add(this._inactiveButtonClass),this._submitButtonElement.disabled=!0):(this._submitButtonElement.classList.remove(this._inactiveButtonClass),this._submitButtonElement.disabled=!1)}_hideInputError(t){const e=this._formElement.querySelector(`#${t.id}-error`);t.classList.remove(this._inputErrorClass),e.classList.remove(this._errorClass),e.textContent=""}_showInputError(t){const e=this._formElement.querySelector(`#${t.id}-error`);t.classList.add(this._inputErrorClass),e.classList.add(this._errorClass),e.textContent=t.validationMessage}_checkInputValidity(t){t.validity.valid?this._hideInputError(t):this._showInputError(t)}enableValidation(){const t=[...this._formElement.querySelectorAll(this._inputSelector)];t.forEach(e=>{e.addEventListener("input",()=>{this._checkInputValidity(e),this._toggleSubmitButtonState(t)})})}}const u=new class{constructor(t,e){this._baseUrl=t,this._options=e}_getResource(t){return fetch(`${this._baseUrl}/${t}`,this._options)}_getDataPromise(t){return fetch(`${this._baseUrl}/${t}`,this._options).then(t=>t.ok?t.json():Promise.reject("Error: "+t.status))}getInitialData(t){Promise.all([fetch(this._baseUrl+"/users/me",this._options),fetch(this._baseUrl+"/cards",this._options)]).then(t=>Promise.all(t.map(t=>t.ok?t.json():Promise.reject("Error: "+t.status)))).then(e=>{t(e)}).catch(t=>{console.log(t)})}updateUserInfo(t){return this._options.method="PATCH",this._options.body=JSON.stringify(t),this._getDataPromise("users/me")}updateUserAvatar(t){return this._options.method="PATCH",this._options.body=JSON.stringify({avatar:t}),this._getDataPromise("users/me/avatar")}addCard(t,e){return this._options.method="POST",this._options.body=JSON.stringify({name:t,link:e}),this._getDataPromise("cards")}removeCard(t){return this._options.method="DELETE",this._getDataPromise("cards/"+t)}addCardLike(t){return this._options.method="PUT",this._getDataPromise("cards/likes/"+t)}removeCardLike(t){return this._options.method="DELETE",this._getDataPromise("cards/likes/"+t)}}("https://around.nomoreparties.co/v1/group-3",{headers:{authorization:"aae17431-b773-4b38-a586-5c35cb6461b9","Content-Type":"application/json"}}),d=new class{constructor(t,e,s){this._nameELement=document.querySelector(t),this._titleElement=document.querySelector(e),this._avatarElement=document.querySelector(s),this._name=this._nameELement.textContent,this._title=this._titleElement.textContent,this._avatar=this._avatarElement.src}getUserInfo(){return{name:this._name,about:this._title}}setUserInfo({name:t,about:e,avatar:s,_id:i}){this._name=t,this._title=e,this._avatar=s,this._nameELement.textContent=t,this._titleElement.textContent=e,this._avatarElement.src=s,this._id=i}getUserId(){return this._id}getAvatar(){return this._avatar}setAvatarElement(t){this._avatarElement.style.backgroundImage=`url(${t})`}}(".profile__name",".profile__title",".profile__avatar"),p=new class extends c{constructor(t){super(t),this._overlayElement.addEventListener("click",()=>super.close())}open(t,e){const s=this._popup.querySelector(".form__pic");s.src=t,s.alt="Picture of "+e,this._popup.querySelector(".form__pic-name").textContent=e,super.open()}}(".place-popup"),m=new _({},{popupSelector:".confirm-popup",saveButtonEnabledFlag:!0}),v={handleCardClick:(t,e)=>p.open(t,e),confirmDelete:t=>{m.setCallbacks({promise:()=>u.removeCard(t.getId()),callback:()=>t.remove()}),m.open()},handleAddLike:t=>u.addCardLike(t),handleRemoveLike:t=>u.removeCardLike(t)},f=t=>d.setUserInfo(t);let k=null;u.getInitialData(([t,e])=>{f(t),k=new i({items:e,renderer:e=>{const s=new r(e,".place-template",v,t._id);k.appendItem(s.getCardElement())}},".places"),k.renderItems()});const E=new _({promise:({name:t,link:e})=>u.addCard(t,e),callback:t=>{const e=new r(t,".place-template",v);k.prependItem(e.getCardElement())}},{popupSelector:".new-place-form"});l.addEventListener("click",()=>E.open());const b=new _({promise:t=>u.updateUserInfo(t),callback:f},{popupSelector:".edit-profile-form"});o.addEventListener("click",()=>{b.setInputValues(d.getUserInfo()),b.open()});const g=new _({promise:t=>u.updateUserAvatar(t.link),callback:f},{popupSelector:".edit-profile-picture"});a.addEventListener("click",()=>{g.open()});[...document.querySelectorAll(".form")].filter(t=>!t.classList.contains("form_display_pic")&&!t.classList.contains("form_confirm_delete")).forEach(t=>{new h({submitButtonSelector:".form__save-button",inputSelector:".form__input",inputErrorClass:"form__input_type_error-indicator",errorClass:"form__input-error-msg",inactiveButtonClass:"form__save-button_disabled"},t).enableValidation()})}]);