'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nester documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-aec5938f18da5ed9fbe648029727c482f67efc67acdbb300b5c71254f2723cd46cca994de73ed37a44317f379a65d04b07e31908769102b8d4f2c753c9fd000a"' : 'data-target="#xs-controllers-links-module-AppModule-aec5938f18da5ed9fbe648029727c482f67efc67acdbb300b5c71254f2723cd46cca994de73ed37a44317f379a65d04b07e31908769102b8d4f2c753c9fd000a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-aec5938f18da5ed9fbe648029727c482f67efc67acdbb300b5c71254f2723cd46cca994de73ed37a44317f379a65d04b07e31908769102b8d4f2c753c9fd000a"' :
                                            'id="xs-controllers-links-module-AppModule-aec5938f18da5ed9fbe648029727c482f67efc67acdbb300b5c71254f2723cd46cca994de73ed37a44317f379a65d04b07e31908769102b8d4f2c753c9fd000a"' }>
                                            <li class="link">
                                                <a href="controllers/HealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-aec5938f18da5ed9fbe648029727c482f67efc67acdbb300b5c71254f2723cd46cca994de73ed37a44317f379a65d04b07e31908769102b8d4f2c753c9fd000a"' : 'data-target="#xs-injectables-links-module-AppModule-aec5938f18da5ed9fbe648029727c482f67efc67acdbb300b5c71254f2723cd46cca994de73ed37a44317f379a65d04b07e31908769102b8d4f2c753c9fd000a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-aec5938f18da5ed9fbe648029727c482f67efc67acdbb300b5c71254f2723cd46cca994de73ed37a44317f379a65d04b07e31908769102b8d4f2c753c9fd000a"' :
                                        'id="xs-injectables-links-module-AppModule-aec5938f18da5ed9fbe648029727c482f67efc67acdbb300b5c71254f2723cd46cca994de73ed37a44317f379a65d04b07e31908769102b8d4f2c753c9fd000a"' }>
                                        <li class="link">
                                            <a href="injectables/HealthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-7b8dc90b1c3a00557494b0a67f0e240afc9088b42c84ab0d7a1059a5cff2361ed0bb9a8d6d8ddfb4dac0ae068a6fcab0ad0cb2830a0de5adb5f42aab08ca5fbb"' : 'data-target="#xs-controllers-links-module-AuthModule-7b8dc90b1c3a00557494b0a67f0e240afc9088b42c84ab0d7a1059a5cff2361ed0bb9a8d6d8ddfb4dac0ae068a6fcab0ad0cb2830a0de5adb5f42aab08ca5fbb"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-7b8dc90b1c3a00557494b0a67f0e240afc9088b42c84ab0d7a1059a5cff2361ed0bb9a8d6d8ddfb4dac0ae068a6fcab0ad0cb2830a0de5adb5f42aab08ca5fbb"' :
                                            'id="xs-controllers-links-module-AuthModule-7b8dc90b1c3a00557494b0a67f0e240afc9088b42c84ab0d7a1059a5cff2361ed0bb9a8d6d8ddfb4dac0ae068a6fcab0ad0cb2830a0de5adb5f42aab08ca5fbb"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-7b8dc90b1c3a00557494b0a67f0e240afc9088b42c84ab0d7a1059a5cff2361ed0bb9a8d6d8ddfb4dac0ae068a6fcab0ad0cb2830a0de5adb5f42aab08ca5fbb"' : 'data-target="#xs-injectables-links-module-AuthModule-7b8dc90b1c3a00557494b0a67f0e240afc9088b42c84ab0d7a1059a5cff2361ed0bb9a8d6d8ddfb4dac0ae068a6fcab0ad0cb2830a0de5adb5f42aab08ca5fbb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-7b8dc90b1c3a00557494b0a67f0e240afc9088b42c84ab0d7a1059a5cff2361ed0bb9a8d6d8ddfb4dac0ae068a6fcab0ad0cb2830a0de5adb5f42aab08ca5fbb"' :
                                        'id="xs-injectables-links-module-AuthModule-7b8dc90b1c3a00557494b0a67f0e240afc9088b42c84ab0d7a1059a5cff2361ed0bb9a8d6d8ddfb4dac0ae068a6fcab0ad0cb2830a0de5adb5f42aab08ca5fbb"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CryptoService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CryptoService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RoutinesModule.html" data-type="entity-link" >RoutinesModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-RoutinesModule-6b3812d6485310442d1687680ad45e760f78fbfbc88381dcc64fc011852a646b6c50468acf4c14ca288869b25a3688331b06324f2fc4826042667b03d6a5c80b"' : 'data-target="#xs-injectables-links-module-RoutinesModule-6b3812d6485310442d1687680ad45e760f78fbfbc88381dcc64fc011852a646b6c50468acf4c14ca288869b25a3688331b06324f2fc4826042667b03d6a5c80b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RoutinesModule-6b3812d6485310442d1687680ad45e760f78fbfbc88381dcc64fc011852a646b6c50468acf4c14ca288869b25a3688331b06324f2fc4826042667b03d6a5c80b"' :
                                        'id="xs-injectables-links-module-RoutinesModule-6b3812d6485310442d1687680ad45e760f78fbfbc88381dcc64fc011852a646b6c50468acf4c14ca288869b25a3688331b06324f2fc4826042667b03d6a5c80b"' }>
                                        <li class="link">
                                            <a href="injectables/EveryMinuteService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EveryMinuteService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserModule-ae2d6ef6d6342011b88080533c484162ee84418612fcd419387b94013543c5eab0f558f007b3b04d2874d7efa53353826476ea6d590a9678b295ecf7cabe0f5e"' : 'data-target="#xs-controllers-links-module-UserModule-ae2d6ef6d6342011b88080533c484162ee84418612fcd419387b94013543c5eab0f558f007b3b04d2874d7efa53353826476ea6d590a9678b295ecf7cabe0f5e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-ae2d6ef6d6342011b88080533c484162ee84418612fcd419387b94013543c5eab0f558f007b3b04d2874d7efa53353826476ea6d590a9678b295ecf7cabe0f5e"' :
                                            'id="xs-controllers-links-module-UserModule-ae2d6ef6d6342011b88080533c484162ee84418612fcd419387b94013543c5eab0f558f007b3b04d2874d7efa53353826476ea6d590a9678b295ecf7cabe0f5e"' }>
                                            <li class="link">
                                                <a href="controllers/MeController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MeController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-ae2d6ef6d6342011b88080533c484162ee84418612fcd419387b94013543c5eab0f558f007b3b04d2874d7efa53353826476ea6d590a9678b295ecf7cabe0f5e"' : 'data-target="#xs-injectables-links-module-UserModule-ae2d6ef6d6342011b88080533c484162ee84418612fcd419387b94013543c5eab0f558f007b3b04d2874d7efa53353826476ea6d590a9678b295ecf7cabe0f5e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-ae2d6ef6d6342011b88080533c484162ee84418612fcd419387b94013543c5eab0f558f007b3b04d2874d7efa53353826476ea6d590a9678b295ecf7cabe0f5e"' :
                                        'id="xs-injectables-links-module-UserModule-ae2d6ef6d6342011b88080533c484162ee84418612fcd419387b94013543c5eab0f558f007b3b04d2874d7efa53353826476ea6d590a9678b295ecf7cabe0f5e"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CustomExceptionFilter.html" data-type="entity-link" >CustomExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/Email.html" data-type="entity-link" >Email</a>
                            </li>
                            <li class="link">
                                <a href="classes/Login.html" data-type="entity-link" >Login</a>
                            </li>
                            <li class="link">
                                <a href="classes/Payload.html" data-type="entity-link" >Payload</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignUp.html" data-type="entity-link" >SignUp</a>
                            </li>
                            <li class="link">
                                <a href="classes/Token.html" data-type="entity-link" >Token</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserDto.html" data-type="entity-link" >UserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserRepository.html" data-type="entity-link" >UserRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/Utils.html" data-type="entity-link" >Utils</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/CustomMiddleware.html" data-type="entity-link" >CustomMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LogPipe.html" data-type="entity-link" >LogPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PerformanceInterceptor.html" data-type="entity-link" >PerformanceInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/QueryObjectPipe.html" data-type="entity-link" >QueryObjectPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserInMemoryRepository.html" data-type="entity-link" >UserInMemoryRepository</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RoleGuard.html" data-type="entity-link" >RoleGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ListResponse.html" data-type="entity-link" >ListResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Paging.html" data-type="entity-link" >Paging</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/QueryObjectPipeOptions.html" data-type="entity-link" >QueryObjectPipeOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});