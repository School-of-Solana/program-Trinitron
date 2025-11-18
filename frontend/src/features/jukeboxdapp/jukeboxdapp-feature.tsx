import { useSolana } from '@/components/solana/use-solana'
import { WalletDropdown } from '@/components/wallet-dropdown'
import { AppHero } from '@/components/app-hero'
import { JukeboxdappUiProgramExplorerLink } from './ui/jukeboxdapp-ui-program-explorer-link'
import { JukeboxdappUiCreate } from './ui/jukeboxdapp-ui-create'
import { JukeboxdappUiProgram } from '@/features/jukeboxdapp/ui/jukeboxdapp-ui-program'

export default function JukeboxdappFeature() {
  const { account } = useSolana()

  if (!account) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="hero py-[64px]">
          <div className="hero-content text-center">
            <WalletDropdown />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <AppHero title="Discography" subtitle={'Add your favorite song and mp3 link so it can be played on the dashboard!'}>
        <p className="mb-6">
          <JukeboxdappUiProgramExplorerLink />
        </p>
        <JukeboxdappUiCreate account={account} />
      </AppHero>
      <JukeboxdappUiProgram />
    </div>
  )
}
