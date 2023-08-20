import styles from './slug.module.css'
export default function layout({
    children,
}: {
    children: React.ReactNode
}) {
    console.log('is running')
    return (
        <html lang="en">
            <body className={`${styles.body}`}>
                {children}
            </body>
        </html>
    );
}