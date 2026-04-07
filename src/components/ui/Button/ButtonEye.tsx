import IconEye from '@/components/svg/IconEye';
import { ButtonI } from './../../../types/index'
export default function ButtonEye(props: ButtonI) {
    const {
        text,
        onClick
    } = props;
    return (
        <button type="button" onClick={onClick} className='focus:outline-none active:outline-none'>
            <IconEye />
        </button>
    )
}