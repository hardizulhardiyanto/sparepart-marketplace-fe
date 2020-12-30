import Vue from 'vue'

import DefaultLayout from '@/components/Base/Layout.vue';
import BaseButton from '@/components/Base/BaseButton.vue';
import BaseTable from '@/components/Base/BaseTable.vue';
import BaseDialogForm from '@/components/Base/BaseDialogForm.vue';
import BaseAlert from '@/components/Base/BaseAlert.vue';
import BaseLoading from '@/components/Base/BaseLoading.vue';
import BaseConfirm from '@/components/Base/BaseConfirm.vue';

Vue.component('default-layout', DefaultLayout)
Vue.component('BaseButton', BaseButton)
Vue.component('BaseTable', BaseTable)
Vue.component('BaseDialogForm', BaseDialogForm)
Vue.component('BaseAlert', BaseAlert)
Vue.component('BaseLoading', BaseLoading)
Vue.component('BaseConfirm', BaseConfirm)