import { Injectable, Logger } from "@nestjs/common"
import { blockchainConfig, SupportedChainKey } from "@/config"
import { valuesWithKey } from "@/utils"
import { PolkadotMenuService } from "./polkadot/menu.service"
import { ReadlineService } from "./readline.service"
import { uiPrompts } from "./constants.menu"

@Injectable()
export class MainMenuService {
    private readonly logger = new Logger(MainMenuService.name)

    constructor(
        private readonly polkadotMenuService: PolkadotMenuService,
        private readonly readlineService: ReadlineService,
    ) {
    }
    //print menu as cli
    public print(hide: boolean = false): void {
        console.clear()
        
        let list = ""
        const blockchainList = valuesWithKey(blockchainConfig())
        blockchainList.map((blockchain, index) => {
            list = list.concat(`${index}. ${blockchain.name} \n`)
        })
        
        if (!hide) {
            console.log(`Welcome to CiFarm CLI 🌾. Which blockchain do you want to interact with?
${list}`)
        }
        
        this.readlineService.rl.question(uiPrompts().enterChoice, (choice: string) => {
            const selectedIndex = parseInt(choice)
            if (!isNaN(selectedIndex) && selectedIndex > 0 && selectedIndex <= blockchainList.length) {
                const selectedBlockchain = blockchainList[selectedIndex]
                this.logger.verbose(`You selected: ${selectedBlockchain.name}`)
                switch (selectedBlockchain.key) {
                case SupportedChainKey.Polkadot: {
                    console.clear()
                    this.polkadotMenuService.print()
                    break
                }
                default: {
                    this.logger.error("This blockchain is not supported yet.")
                    this.print(true)
                    break
                }
                }
            } else {
                this.logger.error("Invalid choice. Please try again.")
                this.print(true)
            }
        })
    }
}
