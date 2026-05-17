import { DEMOS } from '../demos'

export default function Hub() {
  return (
    <div className='hub'>
      <header className='hub__intro'>
        <h2>Demos</h2>
        <p>
          Self-contained example apps, each running against an in-browser fake
          server (MSW). Pick one to open it.
        </p>
      </header>
      <ul className='hub__list'>
        {DEMOS.map((demo) => (
          <li key={demo.id} className='hub__item'>
            <a className='hub__link' href={`#/${demo.id}`}>
              <h3>{demo.name}</h3>
              <p>{demo.blurb}</p>
              <ul className='hub__features'>
                {demo.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
