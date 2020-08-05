!function(t){var e={};function s(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,s),i.l=!0,i.exports}s.m=t,s.c=e,s.d=function(t,e,r){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)s.d(r,i,function(e){return t[e]}.bind(null,i));return r},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=1)}([function(t,e,s){},function(t,e,s){"use strict";s.r(e),s.d(e,"api",(function(){return d}));s(0);class r{constructor({items:t,renderer:e},s){this._renderedItems=t,this._renderer=e,this._container=document.querySelector(s)}appendItem(t){this._container.append(t)}prependItem(t){this._container.prepend(t)}clear(){this._container.innerHTML=""}setItems(t){this._renderedItems=t}renderItems(){this.clear(),this._renderedItems.forEach(t=>{this._renderer(t)})}}class i{constructor({likes:t,_id:e,name:s,link:r,owner:i},n,{handleCardClick:o,confirmDelete:a,handleCardLike:l},c){this._placeName=s,this._imageURL=r,this._likes=t,this._id=e,this._owner=i,this._templateSelector=n,this._handleCardClick=o,this._handleCardDelete=a,this._handleCardLike=l,this._userId=c||this._owner._id,this._card=this._setCardElement()}toggleLike(){this._likeButtonElement.classList.toggle("like__button_active")}_isLiked(){this._likes.some(t=>t._id===this._userId)&&this.toggleLike()}setLikeCount(t){this._likeCount=t,this._likeCountElement.textContent=t}_getCardTemplate(){return document.querySelector(this._templateSelector).content.querySelector(".place").cloneNode(!0)}_setEventListeners(){this._likeButtonElement.addEventListener("click",t=>{this._handleCardLike(t,this._id)}),this._trashButtonElement.addEventListener("click",()=>{this._handleCardDelete(this)}),this._card.querySelector(".place__picture").addEventListener("click",()=>{this._handleCardClick(this._imageURL,this._placeName)})}_setCardElement(){this._card=this._getCardTemplate();const t=this._card.querySelector(".place__picture");return t.src=this._imageURL,t.alt="Picture of "+this._placeName,this._card.querySelector(".place__name").textContent=this._placeName,this._likeCountElement=this._card.querySelector(".like__count"),this._likeButtonElement=this._card.querySelector(".like__button"),this._trashButtonElement=this._card.querySelector(".trash-button"),this.setLikeCount(this._likes.length),this._likeCount>0&&this._isLiked(),this._owner._id!==this._userId&&this._trashButtonElement.classList.add("hide"),this._setEventListeners(),this._card}getCardElement(){return this._card}getId(){return this._id}getLikeButtonElement(){return this._likeButtonElement}getImageUrl(){return this._imageURL}getImageName(){return this._placeName}remove(){this._card.remove(),this._card=null}}const n=document.querySelector(".content"),o=document.getElementById("edit-profile-button"),a=n.querySelector(".profile__avatar-container"),l=n.querySelector(".add-button"),c=new class{constructor(t,e,s){this._nameELement=document.querySelector(t),this._titleElement=document.querySelector(e),this._avatarElement=document.querySelector(s),this._name=this._nameELement.textContent,this._title=this._titleElement.textContent,this._avatar=this._avatarElement.src}getUserInfo(){return{name:this._name,about:this._title}}setUserInfo({name:t,about:e,avatar:s,_id:r}){this._name=t,this._title=e,this._avatar=s,this._nameELement.textContent=t,this._titleElement.textContent=e,this._avatarElement.src=s,this._id=r}getUserId(){return this._id}getAvatar(){return this._avatar}setAvatarElement(t){this._avatarElement.style.backgroundImage=`url(${t})`}}(".profile__name",".profile__title",".profile__avatar");class u{constructor(t){this._selector=t,this._popup=document.querySelector(t),this._form=this._popup.querySelector(".form"),this._closeButton=this._popup.querySelector(".form__close-button"),this._closeButton.addEventListener("click",()=>this.close()),this._saveButton=this._popup.querySelector(".form__save-button"),this._escapeHandler=t=>{"Escape"===t.key&&this.close()}}open(){document.addEventListener("keyup",this._escapeHandler),this._popup.classList.toggle("hide")}close(){document.removeEventListener("keyup",this._escapeHandler),this._popup.classList.toggle("hide")}populatePopup(t){t(this._popup)}setOverlayListener(t){t(this._popup.querySelector(".overlay"))}setFormListener(t){t(this._form)}resetForm(t){t(this._form,this._saveButton,this._saveButtonOrigTxt)}setSaveButtonTxt(t){this._saveButtonOrigTxt=this._saveButton.textContent,t(this._saveButton)}getFormFieldValues(t){t(this._form)}}class _ extends u{constructor(t,e){super(t),this._handleFormSubmit=e,super.setFormListener(t=>{t.addEventListener("submit",t=>{t.preventDefault(),super.getFormFieldValues(t=>{this._handleFormSubmit(this._getInputValues(t)).then(t=>{this.close()})})})})}_getInputValues(t){const e=t.querySelectorAll(".form__input"),s={};return e.forEach(t=>{s[t.name]=t.value}),s}close(){super.resetForm((t,e,s)=>{t.reset(),e.textContent=s,e.classList.add("form__save-button_disabled"),e.disabled=!0}),super.close()}setHandleFormSubmit(t){this._handleFormSubmit=t}}class h{constructor({submitButtonSelector:t,inputSelector:e,inputErrorClass:s,errorClass:r,inactiveButtonClass:i},n){this._formElement=n,this._submitButtonElement=this._formElement.querySelector(t),this._inputSelector=e,this._inputErrorClass=s,this._errorClass=r,this._inactiveButtonClass=i}_hasInvalidInput(t){return t.some(t=>!t.validity.valid)}_toggleSubmitButtonState(t){this._hasInvalidInput(t)?(this._submitButtonElement.classList.add(this._inactiveButtonClass),this._submitButtonElement.disabled=!0):(this._submitButtonElement.classList.remove(this._inactiveButtonClass),this._submitButtonElement.disabled=!1)}_hideInputError(t){const e=this._formElement.querySelector(`#${t.id}-error`);t.classList.remove(this._inputErrorClass),e.classList.remove(this._errorClass),e.textContent=""}_showInputError(t){const e=this._formElement.querySelector(`#${t.id}-error`);t.classList.add(this._inputErrorClass),e.classList.add(this._errorClass),e.textContent=t.validationMessage}_checkInputValidity(t){t.validity.valid?this._hideInputError(t):this._showInputError(t)}enableValidation(){const t=[...this._formElement.querySelectorAll(this._inputSelector)];t.forEach(e=>{e.addEventListener("input",()=>{this._checkInputValidity(e),this._toggleSubmitButtonState(t)})})}}const d=new class{constructor(t,e){this._baseUrl=t,this._options=e}_getResource(t){return fetch(`${this._baseUrl}/${t}`,this._options)}_transactData(t,e){return fetch(`${this._baseUrl}/${t}`,this._options).then(t=>t.ok?t.json():Promise.reject("Error: "+t.status)).then(t=>{e(t)}).catch(t=>{console.log(t)})}getInitialData(t){Promise.all([fetch(this._baseUrl+"/users/me",this._options),fetch(this._baseUrl+"/cards",this._options)]).then(t=>Promise.all(t.map(t=>t.ok?t.json():Promise.reject("Error: "+t.status)))).then(e=>{t(e)}).catch(t=>{console.log(t)})}updateUserInfo(t,e){this._options.method="PATCH",this._options.body=JSON.stringify(t),this._transactData("users/me",e)}updateUserAvatar(t,e){this._options.method="PATCH",this._options.body=JSON.stringify({avatar:t}),this._transactData("users/me/avatar",e)}addCard(t,e,s){return this._options.method="POST",this._options.body=JSON.stringify({name:t,link:e}),this._transactData("cards",s)}removeCard(t,e){this._options.method="DELETE",this._transactData("cards/"+t,e)}addCardLike(t,e){this._options.method="PUT",this._transactData("cards/likes/"+t,e)}removeCardLike(t,e){this._options.method="DELETE",this._transactData("cards/likes/"+t,e)}}("https://around.nomoreparties.co/v1/group-3",{headers:{authorization:"aae17431-b773-4b38-a586-5c35cb6461b9","Content-Type":"application/json"}}),m=new class extends u{constructor(t){super(t),super.setOverlayListener(t=>{t.addEventListener("click",()=>super.close())})}open(t,e){super.populatePopup(s=>{const r=s,i=r.querySelector(".form__pic");i.src=t,i.alt="Picture of "+e,r.querySelector(".form__pic-name").textContent=e}),super.open()}}(".place-popup"),p=new _(".confirm-popup"),v={handleCardClick:(t,e)=>m.open(t,e),confirmDelete:t=>{p.setHandleFormSubmit(()=>{d.removeCard(t.getId(),()=>{t.remove()}),p.close()}),p.open()},handleCardLike:(t,e)=>{const s=({likes:e})=>{t.target.parentNode.querySelector(".like__count").textContent=e.length,t.target.classList.toggle("like__button_active")};t.target.classList.contains("like__button_active")?d.removeCardLike(e,s):d.addCardLike(e,s)}},f=t=>c.setUserInfo(t);let E=null;d.getInitialData(([t,e])=>{f(t),E=new r({items:e,renderer:e=>{const s=new i(e,".place-template",v,t._id);E.appendItem(s.getCardElement())}},".places"),E.renderItems()});const g=new _(".new-place-form",({name:t,link:e})=>(g.setSaveButtonTxt(t=>t.textContent="Saving..."),d.addCard(t,e,t=>{const e=new i(t,".place-template",v);E.prependItem(e.getCardElement())})));l.addEventListener("click",()=>{g.open()});const C=new _(".edit-profile-form",t=>{C.setSaveButtonTxt(t=>t.textContent="Saving..."),d.updateUserInfo(t,t=>{f(t),C.close()})});o.addEventListener("click",()=>{const t=c.getUserInfo();C.populatePopup(e=>{const s=e;s.querySelector(".form__input_type_name").value=t.name,s.querySelector(".form__input_type_title").value=t.about}),C.open()});const y=new _(".edit-profile-picture",t=>{y.setSaveButtonTxt(t=>t.textContent="Saving..."),d.updateUserAvatar(t.link,t=>{f(t),y.close()})});a.addEventListener("click",()=>{y.open()});[...document.querySelectorAll(".form")].filter(t=>!t.classList.contains("form_display_pic")&&!t.classList.contains("form_confirm_delete")).forEach(t=>{new h({submitButtonSelector:".form__save-button",inputSelector:".form__input",inputErrorClass:"form__input_type_error-indicator",errorClass:"form__input-error-msg",inactiveButtonClass:"form__save-button_disabled"},t).enableValidation()})}]);