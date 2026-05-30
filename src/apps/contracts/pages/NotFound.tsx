import { Link } from '../../Link'
import { contractsRoutes } from '../routes'

export function NotFound() {
  return (
    <article className="cap-page cap-page--notfound">
      <p className="cap-page__kicker">404</p>
      <h1 className="cap-page__title">That chapter doesn't exist</h1>
      <p className="cap-page__lede">
        The page you're after isn't part of Cap School. Head back to the start
        and pick up the thread.
      </p>
      <Link to={contractsRoutes.overview()} className="cap-pager__link cap-pager__link--next">
        <span className="cap-pager__dir">Go to →</span>
        <span className="cap-pager__label">Overview</span>
      </Link>
    </article>
  )
}
