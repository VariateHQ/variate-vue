import { name, styles } from '../config/console';

export default {
    show: function() {
        console.log(
            `%c ${name} %c __VERSION__ `,
            styles.brand,
            styles.type
        );
    },
}
