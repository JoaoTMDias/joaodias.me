import styles from "./Show.module.scss";

export type ShowProps = {
	href: string;
	cover?: string;
	name: string;
	date?: string;
	title: string;
	description?: string;
};

const DEFAULT_COVER =
	"https://ruc.pt/_next/image?url=https%3A%2F%2Fbucket.ruc.pt%2Fwp-content%2Fuploads%2F2026%2F01%2F05091026%2Fcover.jpeg&w=3840&q=75";

function Show({ cover = DEFAULT_COVER, name, date, title, description }: ShowProps) {
	return (
		<div className={styles.show}>
			<article className={styles.card} lang="pt-PT">
				<img className={styles.cover} src={cover} width="200" height="200" alt="" />
				<h3 className={styles.title}>{title}</h3>
				<div className={styles.metadata}>
					<span className={styles.name}>{name}</span>
					<time dateTime={date} className={styles.date}>
						<span className="sr-only">Aired on</span>&nbsp;{date}
					</time>
				</div>
				<div className={styles.content}>
					<p className={styles.description}>{description}</p>
					<a
						className={styles.link}
						href="https://ruc.pt/podcast/mel-e-tal/05-de-janeiro-de-2026-os-melhores-do-ano-parte-1-de-2"
					>
						Listen to this show
					</a>
				</div>
			</article>
		</div>
	);
}

export default Show;
