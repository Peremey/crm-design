<script setup lang="ts">
import { latLngMask, numbersMask, phoneMask, tgMask } from '~/lib/validate/masks/masks';
import { useValidate } from '~/lib/validate';
import { FormMain } from '~/uikit/form';
import { UiIcon } from '~/uikit/icon';
import { InputMain } from '~/uikit/input';
import DocumentsUpload from '~/components/shootRange/parameters/DocumentsUpload.vue';
import LogoUpload from '~/components/shootRange/parameters/LogoUpload.vue';

const { formErrorState, vMaxL, vLatLng, vEmail, vPhone, vPhoneEmpty, vName, vEqualL } = useValidate();

const vAddress = vMaxL(320)
const vLnk = vMaxL(400)
const vWhatsapp = vMaxL(120)
const vMAX = vMaxL(120)
const vNameOrg = vMaxL(320)
const vAddressOrg = vMaxL(320)
const vSmallNameOrg = vMaxL(120)
const vInn = vEqualL(10)
const vKpp = vEqualL(9)
const vOgrn = vMaxL(15)
const vAccNumber = vEqualL(20)
const vBanc = vMaxL(120)
const vCorrespondentAcc = vEqualL(20)
const vBik = vEqualL(9)
const vComment = vMaxL(1000)

const submit = () => { }
</script>

<template>
    <section name="parameters" class="parameters cont">
        <h1>Параметры</h1>

        <FormMain :submit="submit" :formErrorState="formErrorState" class="parameters__form">
            <div class="parameters__table">
                <div class="parameters__label">
                    Название
                </div>
                <div class="parameters__content">
                    <LogoUpload />
                    <InputMain label="Название" :validate="vMaxL(120, true)" :required="true" />
                </div>

                <div class="parameters__label">
                    Адрес
                </div>
                <div class="parameters__content">
                    <InputMain ref="addressRef" :isTextarea="true" :validate="vAddress" class="parameters__textarea" />
                </div>

                <div class="parameters__label parameters_sep">
                    Координаты
                </div>
                <div class="parameters__content parameters_sep">
                    <div class="parameters__row">
                        <InputMain label="Широта" :mask="latLngMask" :validate="vLatLng" />
                        <InputMain label="Долгота" :mask="latLngMask" :validate="vLatLng" />
                    </div>
                    <InputMain ref="lnkRef" label="Ссылка на Яндекс Карты" :validate="vLnk" />
                </div>

                <div class="parameters__label parameters_pad">
                    Контакты
                </div>
                <div class="parameters__content parameters_pad">
                    <div class="parameters__row">
                        <InputMain ref="emailRef" label="Email" :validate="vEmail">
                            <template #iconLeft>
                                <UiIcon name="t-letter" />
                            </template>
                        </InputMain>
                        <InputMain ref="phoneRef" label="Телефон" :validate="vPhone" :mask="phoneMask" :required="true">
                            <template #iconLeft>
                                <UiIcon name="phone" />
                            </template>
                        </InputMain>
                    </div>
                    <div class="parameters__row">
                        <InputMain ref="phone2Ref" label="Телефон2" :validate="vPhoneEmpty" :mask="phoneMask">
                            <template #iconLeft>
                                <UiIcon name="phone" />
                            </template>
                        </InputMain>
                        <InputMain ref="whatsappRef" label="Whatsapp (ссылка)" :validate="vWhatsapp">
                            <template #iconLeft>
                                <UiIcon name="whatsapp" />
                            </template>
                        </InputMain>
                    </div>
                    <div class="parameters__row">
                        <InputMain ref="tgRef" label="Telegram (ссылка)" :mask="tgMask">
                            <template #iconLeft>
                                <UiIcon name="tg" />
                            </template>
                        </InputMain>
                        <InputMain ref="maxRef" label="MAX (ссылка)" :validate="vMAX">
                            <template #iconLeft>
                                <UiIcon name="max" />
                            </template>
                        </InputMain>
                    </div>
                </div>

                <div class="parameters__label parameters_sep">
                    Контактное лицо
                </div>
                <div class="parameters__content parameters_sep">
                    <div class="parameters__row">
                        <InputMain ref="fnameRef" label="Фамилия" :validate="vName" :required="true" />
                        <InputMain ref="lnameRef" label="Имя" :validate="vName" :required="true" />
                        <InputMain ref="pnameRef" label="Отчество" :validate="vName" :required="true" />
                    </div>
                </div>

                <div class="parameters__label parameters_sep parameters_pad">
                    Режим работы
                </div>
                <div class="parameters__content parameters_sep parameters_pad">
                    <div class="parameters__row">
                        <InputMain type="time" label="Понедельник" />
                        <InputMain type="time" label="Обед" />
                    </div>
                    <div class="parameters__row">
                        <InputMain type="time" label="Вторник" />
                        <InputMain type="time" label="Обед" />
                    </div>
                    <div class="parameters__row">
                        <InputMain type="time" label="Среда" />
                        <InputMain type="time" label="Обед" />
                    </div>
                    <div class="parameters__row">
                        <InputMain type="time" label="Четверг" />
                        <InputMain type="time" label="Обед" />
                    </div>
                    <div class="parameters__row">
                        <InputMain type="time" label="Пятница" />
                        <InputMain type="time" label="Обед" />
                    </div>
                    <div class="parameters__row">
                        <InputMain type="time" label="Суббота" />
                        <InputMain type="time" label="Обед" />
                    </div>
                    <div class="parameters__row">
                        <InputMain type="time" label="Воскресенье" />
                        <InputMain type="time" label="Обед" />
                    </div>
                </div>

                <div class="parameters__label parameters_sep parameters_pad">
                    Характеристики
                </div>
                <div class="parameters__content parameters_sep parameters_pad">
                    <div class="parameters__row">
                        <InputMain ref="maxlRef" label="Максимальная длина, м" :mask="numbersMask" />
                        <InputMain ref="maxwRef" label="Ширина, м" :mask="numbersMask" />
                    </div>
                    <div class="parameters__row parameters__row_05">
                        <InputMain label="Кол-во направлений" :mask="numbersMask" />
                    </div>
                </div>

                <div class="parameters__label parameters_pad">
                    Юридическая информация
                </div>
                <div class="parameters__content parameters_pad">
                    <InputMain ref="nameOrgRef" label="Название организации" :validate="vNameOrg" />
                    <InputMain ref="addressOrgRef" label="Юридический адрес" :validate="vAddressOrg" />
                    <InputMain ref="smallNameOrgRef" label="Краткое название" :validate="vSmallNameOrg" />
                    <div class="parameters__row">
                        <InputMain ref="innRef" label="ИНН" :validate="vInn" :mask="numbersMask" />
                        <InputMain ref="kppRef" label="КПП" :validate="vKpp" :mask="numbersMask" />
                        <InputMain ref="ogrnRef" label="ОГРН" :validate="vOgrn" :mask="numbersMask" />
                    </div>
                    <div class="parameters__row">
                        <InputMain ref="AccNumberRef" label="Расчетный счет" :validate="vAccNumber"
                            :mask="numbersMask" />
                        <InputMain ref="bancAccRef" label="Банк" :validate="vBanc" />
                    </div>
                    <div class="parameters__row">
                        <InputMain ref="CorrespondentAccRef" label="Корреспондентский счет"
                            :validate="vCorrespondentAcc" :mask="numbersMask" />
                        <InputMain ref="bikRef" label="БИК" :validate="vBik" :mask="numbersMask" />
                    </div>
                    <button class="lnk">
                        <UiIcon name="share" />
                        Поделиться
                    </button>
                    <DocumentsUpload />
                    <InputMain ref="commentRef" :isTextarea="true" placeholder="Текст до 1 000 символов..."
                        :validate="vComment" class="parameters__comment" />
                </div>
            </div>
            <div class="parameters__btns">
                <button class="btn btn_black">
                    <UiIcon name="check" />
                    Сохранить
                </button>
            </div>
        </FormMain>
    </section>
</template>

<style scoped lang="scss">
.parameters {
    &__form {
        border-radius: r(20);
        border: solid r(1) $l-gray;
        background-color: white;
        padding: r(32);
    }

    &__table {
        display: grid;
        grid-template-columns: r(224) 1fr;
    }

    &__label {
        @include m-20;
        color: $black;
        padding-right: r(8);
        min-width: 0;
    }

    &_sep {
        border-bottom: solid r(1) $l-gray;
    }

    &_pad {
        padding-top: r(24);
    }

    &__content {
        min-width: 0;
    }

    &__textarea {
        --height: #{r(84)};
        --border-radius: #{r(20)};
    }

    &__comment {
        --height: #{r(164)};
        --border-radius: #{r(20)};
    }

    &__row {
        display: flex;
        gap: r(16);

        &>* {
            flex: 1 1 auto;
            min-width: 0;
        }

        &_05 {
            &>* {
                max-width: 50%;
            }
        }
    }

    &__btns {
        display: flex;
        justify-content: flex-end;
    }

}

.lnk {
    margin-bottom: r(24);
}
</style>
