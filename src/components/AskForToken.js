import React from 'react'

const AskForToken = () => {
  const [token, setToken] = React.useState('')
  const validToken = /[\da-f]{40}/.test(token)

  return (
    <div className="bg-yellow-light text-gray-dark p-3 d-flex flex-items-center lh-default">
      <div
        style={{
          width: 60,
          height: 60,
          backgroundImage: `url(${chrome.runtime.getURL('tako.svg')})`,
          backgroundSize: '90%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundColor: '#fff',
          borderRadius: '50%',
          boxShadow: '0 0 0 5px white',
        }}
      />
      <div className="flex-auto pl-3">
        <div>
          {process.env.DISPLAY_NAME} needs a <b>personal access token</b> to
          work.
        </div>
        <a
          href={`https://github.com/settings/tokens/new?description=${process.env.DISPLAY_NAME}&scopes=repo`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Click here to generate a token
        </a>
        , then paste it into the box and hit <b>Save</b>
      </div>
      <form
        onSubmit={event => {
          event.preventDefault()
          if (validToken) {
            chrome.storage.sync.set({ token: token || null })
          }
        }}
      >
        <input
          css={{
            width: '41ch',
            textAlign: 'left',
          }}
          value={token}
          className="form-control input-sm"
          spellCheck="false"
          autoComplete="off"
          size="40"
          maxLength="40"
          pattern="[\da-f]{40}"
          type="password"
          placeholder="Personal Access Token"
          onChange={({ target: { value } }) => setToken(value)}
        />
        <button className="ml-2 btn btn-sm btn-primary" disabled={!validToken}>
          Save
        </button>
      </form>
    </div>
  )
}

export default AskForToken
