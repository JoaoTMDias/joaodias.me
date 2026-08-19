import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./BlogSearch.module.scss";

type BlogArticle = {
	id: string;
	title: string;
	excerpt: string;
	category: string;
	tags: string[];
	featuredImage?: string;
	readingTime?: number;
	pubDateISO: string;
	pubDateLabel: string;
};

type BlogSearchProps = {
	articles: BlogArticle[];
};

function normalize(value: string) {
	return value.trim().toLowerCase();
}

function articleSearchText(article: BlogArticle) {
	return normalize(
		[article.title, article.excerpt, article.category, ...(article.tags ?? [])].join(" "),
	);
}

function BlogSearch({ articles }: BlogSearchProps) {
	const [inputValue, setInputValue] = useState("");
	const [query, setQuery] = useState("");
	const searchInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const initialQuery = params.get("q")?.trim() ?? "";
		setInputValue(initialQuery);
		setQuery(initialQuery);
	}, []);

	const normalizedQuery = normalize(query);

	const filteredArticles = useMemo(() => {
		if (!normalizedQuery) return articles;

		return articles.filter((article) => articleSearchText(article).includes(normalizedQuery));
	}, [articles, normalizedQuery]);

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const value = inputValue.trim();
		setInputValue(value);
		setQuery(value);
		updateUrl(value);
	}

	function handleClear() {
		setInputValue("");
		setQuery("");
		updateUrl("");
		searchInputRef.current?.focus();
	}

	function updateUrl(value: string) {
		const params = new URLSearchParams(window.location.search);

		if (value) {
			params.set("q", value);
		} else {
			params.delete("q");
		}

		const queryString = params.toString();
		const nextUrl = queryString
			? `${window.location.pathname}?${queryString}`
			: window.location.pathname;
		window.history.replaceState({}, "", nextUrl);
	}

	const hasSearchValue = inputValue.length > 0 || normalizedQuery.length > 0;
	const resultCount = filteredArticles.length;
	const hasArticles = articles.length > 0;
	const hasResults = resultCount > 0;

	return (
		<section className={clsx("section", styles["blog-search"])}>
			<search>
				<form className={styles["search-form"]} action="/blog" method="get" onSubmit={handleSubmit}>
					<label htmlFor="search" className="sr-only">
						Search articles
					</label>
					<input
						ref={searchInputRef}
						className={styles["search-input"]}
						type="search"
						id="search"
						name="q"
						placeholder="Search articles..."
						value={inputValue}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
							setInputValue(event.target.value)
						}
					/>
					<button className={styles["search-button"]} type="submit">
						Search
					</button>
					{hasSearchValue && (!hasArticles || hasResults) ? (
						<button className={styles["clear-button"]} type="button" onClick={handleClear}>
							Clear search
						</button>
					) : null}
				</form>
			</search>

			<div id="blog-results-summary" className={styles["results-top"]} role="status">
				<p id="blog-results-count" className={styles["results-total"]}>
					{resultCount} {resultCount === 1 ? "article" : "articles"}
				</p>
				<p id="blog-results-term" className={styles["results-term"]}>
					{normalizedQuery ? `Search results for "${query}"` : "All articles"}
				</p>
			</div>

			{!hasArticles ? (
				<div className="empty-state">
					<p>
						Articles coming soon! Check back later for insights on Frontend Engineering and Web
						Accessibility.
					</p>
				</div>
			) : hasResults ? (
				<ol className={styles["results-list"]}>
					{filteredArticles.map((article) => (
						<li key={article.id} className={styles["result-item"]}>
							<article className={styles["featured-article"]}>
								<a href={`/blog/${article.id}`} className={styles["featured-article__link"]}>
									{article.featuredImage ? (
										<img
											className={styles["featured-article__cover"]}
											src={article.featuredImage}
											width="960"
											height="480"
											alt=""
											loading="lazy"
											style={{ viewTransitionName: `article-image-${article.id}` }}
										/>
									) : null}
									<div className={styles["featured-article__content"]}>
										<time
											dateTime={article.pubDateISO}
											className={styles["featured-article__date"]}
										>
											<span className="sr-only">Published on</span>&nbsp;
											{article.pubDateLabel}
										</time>
										<h3
											className={styles["featured-article__title"]}
											style={{ viewTransitionName: `article-title-${article.id}` }}
										>
											{article.title}
										</h3>
										{article.readingTime ? (
											<p className={styles["featured-article__reading-time"]}>
												{article.readingTime} min read
											</p>
										) : null}
									</div>
								</a>
							</article>
						</li>
					))}
				</ol>
			) : (
				<div className="empty-state">
					<p>No articles match your search. Try a different term.</p>
					<button className={styles["clear-button"]} type="button" onClick={handleClear}>
						Clear search
					</button>
				</div>
			)}
		</section>
	);
}

export default BlogSearch;
