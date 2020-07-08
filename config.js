export class Config {
  constructor() {
    if(Config._instance) return Config._instance;
    this._ADD_BUTTON_SELECTOR = '.add-button';
    this._CLICK_EVENT = 'click';
    this._CLOSE_BUTTON_SELECTOR = '.form__close-button';
    this._CONTAINER_SELECTOR = '.content';
    this._EDIT_BUTTON_SELECTOR = '.edit-button';
    this._EDIT_FORM_ID = 'edit-profile';
    this._EDIT_FORM_SECTION_CLASS = 'edit-profile-form';
    this._EDIT_FORM_SECTION_SELECTOR = '.edit-profile-form';
    this._ESCAPE_KEY = 'Escape';
    this._FORM_PIC_SELECTOR = '.form__pic';
    this._FORM_PIC_NAME_SELECTOR = '.form__pic-name';
    this._FORM_SAVE_BUTTON_SELECTOR = '.form__save-button';
    this._FORM_SELECTOR = '.form';
    this._HEART_BUTTON_CLASS = 'heart-button';
    this._HEART_BUTTON_ACTIVE_CLASS = 'heart-button_active';
    this._HIDE_CLASS = 'hide';
    this._INACTIVE_SAVE_BUTTON_CLASS = 'form__save-button_disabled';
    this._INPUT_ERROR_INDICATOR_CLASS = 'form__input_type_error-indicator';
    this._INPUT_ERROR_MSG_CLASS = 'form__input-error-msg';
    this._INPUT_EVENT = 'input';
    this._INPUT_SELECTOR = '.form__input';
    this._INPUT_TYPE_LINK_SELECTOR = '.form__input_type_link';
    this._INPUT_TYPE_NAME_SELECTOR = '.form__input_type_name';
    this._INPUT_TYPE_TITLE_SELECTOR = '.form__input_type_title';
    this._KEYUP_EVENT = 'keyup';
    this._NEW_PLACE_FORM_SECTION_SELECTOR = '.new-place-form';
    this._NEW_PLACE_ID = 'new-place';
    this._OPEN_ACTION = 'open';
    this._OVERLAY_SELECTOR = '.overlay';
    this._PLACE_NAME_SELECTOR = '.place__name';
    this._PLACE_PIC_CLASS = 'place__picture';
    this._PLACE_PIC_SELECTOR = `.place__picture`;
    this._PLACE_POP_UP_SELECTOR = '.place-popup';
    this._PLACE_TEMPLATE_ID = 'place-template';
    this._PLACE_SELECTOR = '.place';
    this._PLACES_SELECTOR = '.places';
    this._PROFILE_NAME_SELECTOR = '.profile__name';
    this._PROFILE_TITLE_SELECTOR = '.profile__title';
    this._SUBMIT_ACTION = 'submit';
    this._TRASH_BUTTON_CLASS = 'trash-button';
    Config._instance = this;
  }

  getAddButtonSelector() { return this._ADD_BUTTON_SELECTOR; }
  getClickEvent() { return this._CLICK_EVENT; }
  getCloseButtonSelector() { return this._CLOSE_BUTTON_SELECTOR; }
  getContainerSelector() { return this._CONTAINER_SELECTOR; }
  getDeleteButtonClass() { return this._TRASH_BUTTON_CLASS; }
  getEditButtonSelector() { return this._EDIT_BUTTON_SELECTOR; }
  getEditFormSectionClass() { return this._EDIT_FORM_SECTION_CLASS; }
  getEditFormSectionSelector() { return this._EDIT_FORM_SECTION_SELECTOR; }
  getEscapeKey() { return this._ESCAPE_KEY; }
  getFormPicNameSelector() { return this._FORM_PIC_NAME_SELECTOR; }
  getFormPicSelector() { return this._FORM_PIC_SELECTOR; }
  getFormSaveButtonSelector() { return this._FORM_SAVE_BUTTON_SELECTOR; }
  getFormSelector() { return this._FORM_SELECTOR; }
  getHideClass() { return this._HIDE_CLASS; }
  getInactiveSaveButtonClass() { return this._INACTIVE_SAVE_BUTTON_CLASS; }
  getInputErrorIndicatorClass() { return this._INPUT_ERROR_INDICATOR_CLASS; }
  getInputErrorMsgClass() { return this._INPUT_ERROR_MSG_CLASS; }
  getInputEvent() { return this._INPUT_EVENT; }
  getInputSelector() { return this._INPUT_SELECTOR; }
  getKeyUpEvent() { return this._KEYUP_EVENT; }
  getLikeButtonActiveClass() { return this._HEART_BUTTON_ACTIVE_CLASS; }
  getLikeButtonClass() { return this._HEART_BUTTON_CLASS; }
  getNewPlaceFormSectionSelector() { return this._NEW_PLACE_FORM_SECTION_SELECTOR; }
  getOpenAction() { return this._OPEN_ACTION; }
  getPageOverlaySelector() { return this._OVERLAY_SELECTOR; }
  getPlaceSelector() { return this._PLACE_SELECTOR; }
  getPlaceLinkFieldSelector() { return this._INPUT_TYPE_LINK_SELECTOR; }
  getPlaceTitleFieldSelector() { return this._INPUT_TYPE_TITLE_SELECTOR; }
  getPlaceNameSelector() { return this._PLACE_NAME_SELECTOR; }
  getPlacePicClass() { return this._PLACE_PIC_CLASS; }
  getPlacePicSelector() { return this._PLACE_PIC_SELECTOR; }
  getPlacePopupSelector() { return this._PLACE_POP_UP_SELECTOR; }
  getPlaceSelector() { return this._PLACE_SELECTOR; }
  getPlacesSelector() { return this._PLACES_SELECTOR; }
  getPlaceTemplateId() { return this._PLACE_TEMPLATE_ID; }
  getProfileNameSelector() { return this._PROFILE_NAME_SELECTOR; }
  getProfileNameFieldSelector() { return this._INPUT_TYPE_NAME_SELECTOR; }
  getProfileTitleSelector() { return this._PROFILE_TITLE_SELECTOR; }
  getProfileTitleFieldSelector() { return this._INPUT_TYPE_TITLE_SELECTOR; }
  getSubmitAction() { return this._SUBMIT_ACTION; }
}
