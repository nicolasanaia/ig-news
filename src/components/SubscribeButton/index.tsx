import { signIn, useSession } from 'next-auth/react'
import { SubscribeButtonProps } from './interface'
import styles from './styles.module.scss'

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
    const [session] = useSession();

    function handleSubscribe() {
        if (!session) {
            signIn('github');
            return;
        }
    }

    return (
        <button
            type='button'
            className={styles.subscribeButton}
            onClick={handleSubscribe}
        >
            Subscribe Now
        </button>
    )
}