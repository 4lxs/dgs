{
  description = "dotx gtk shell";

  outputs = {
    self,
    flake-parts,
    systems,
    ...
  } @ inputs:
    flake-parts.lib.mkFlake {inherit inputs;} {
      imports = [./flake-modules];
      systems = import systems;

      perSystem = {
        config,
        pkgs,
        ...
      }: {
        packages = rec {
          default = dgs;
          dgs = pkgs.callPackage ./flake-modules/package.nix {inherit inputs;};
        };
      };
    };

  inputs = {
    systems.url = "github:nix-systems/default";

    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    nixpkgs-stable.url = "github:nixos/nixpkgs/nixos-23.05";

    flake-parts.url = "github:hercules-ci/flake-parts";
    pre-commit-hooks.url = "github:cachix/pre-commit-hooks.nix";

    matugen.url = "github:InioX/matugen";
    astal.url = "github:Aylur/astal";
    aylur.url = "github:Aylur/dotfiles";
    ags.url = "github:Aylur/ags";
  };
}
